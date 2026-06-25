import { useState, useEffect, useCallback } from 'react'
import { supabase, dbTeamToApp, appTeamToDb } from '../lib/supabase.js'
import { team as staticTeam, advisors as staticAdvisors } from '../data/team.js'

function slugify(name = '') {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || Date.now().toString()
}

export function usePublicTeam() {
  const [team, setTeam]         = useState(staticTeam)
  const [advisors, setAdvisors] = useState(staticAdvisors)
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    supabase.from('team_members').select('*').order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) {
          const rows = data.map(dbTeamToApp)
          const ids  = new Set(rows.map(r => r.id))
          const fbTeam = staticTeam.filter(m => !ids.has(slugify(m.name)))
          const fbAdv  = staticAdvisors.filter(m => !ids.has(slugify(m.name)))
          setTeam([...rows.filter(r => r.section === 'team'), ...fbTeam])
          setAdvisors([...rows.filter(r => r.section === 'advisors'), ...fbAdv])
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return { team, advisors, loading }
}

export function useAdminTeam() {
  const [rows, setRows]       = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  async function load() {
    setLoading(true)
    const { data, error: err } = await supabase
      .from('team_members')
      .select('*')
      .order('sort_order', { ascending: true })

    if (err) {
      setError(err.message)
      const all = [
        ...staticTeam.map(m => ({ ...m, id: slugify(m.name), section: 'team', _source: 'static' })),
        ...staticAdvisors.map(m => ({ ...m, id: slugify(m.name), section: 'advisors', _source: 'static' })),
      ]
      setRows(all)
    } else {
      const supabaseIds = new Set((data || []).map(r => r.id))
      const fallback = [
        ...staticTeam.filter(m => !supabaseIds.has(slugify(m.name))).map(m => ({ ...m, id: slugify(m.name), section: 'team', _source: 'static' })),
        ...staticAdvisors.filter(m => !supabaseIds.has(slugify(m.name))).map(m => ({ ...m, id: slugify(m.name), section: 'advisors', _source: 'static' })),
      ]
      setRows([...(data || []).map(dbTeamToApp), ...fallback])
    }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const upsert = useCallback(async (form, existingId) => {
    const payload = appTeamToDb(form, existingId)
    const { error: err } = await supabase.from('team_members').upsert(payload, { onConflict: 'id' })
    if (err) throw new Error(err.message)
    await load()
  }, [])

  const remove = useCallback(async (id) => {
    const { error: err } = await supabase.from('team_members').delete().eq('id', id)
    if (err) throw new Error(err.message)
    setRows(prev => prev.filter(r => r.id !== id || r._source === 'static'))
    await load()
  }, [])

  return { rows, loading, error, upsert, remove, refresh: load }
}
