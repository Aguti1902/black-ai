import { useState, useEffect, useCallback } from 'react'
import { supabase, dbTeamToApp, appTeamToDb } from '../lib/supabase.js'
import { team as staticTeam, advisors as staticAdvisors } from '../data/team.js'

const HIDDEN_KEY = 'team_hidden_ids'

function slugify(name = '') {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || Date.now().toString()
}

function staticDefaults() {
  return [
    ...staticTeam.map(m => ({ ...m, id: slugify(m.name), section: 'team', sortOrder: 0, _source: 'static' })),
    ...staticAdvisors.map(m => ({ ...m, id: slugify(m.name), section: 'advisors', sortOrder: 0, _source: 'static' })),
  ]
}

/** DB rows always win. hidden_ids only suppress static fallbacks (soft-deleted defaults). */
function mergeRoster(dbRows, hiddenIds) {
  const hidden = new Set(hiddenIds || [])
  const fromDb = (dbRows || []).map(dbTeamToApp)
  const dbIds = new Set(fromDb.map(r => r.id))

  const fromStatic = staticDefaults().filter(
    item => !dbIds.has(item.id) && !hidden.has(item.id),
  )

  return [...fromDb, ...fromStatic].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
}

async function fetchHiddenIds() {
  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', HIDDEN_KEY)
    .maybeSingle()
  if (error) throw new Error(error.message)
  return Array.isArray(data?.value) ? data.value : []
}

async function saveHiddenIds(ids) {
  const { error } = await supabase
    .from('site_settings')
    .upsert(
      { key: HIDDEN_KEY, value: ids, updated_at: new Date().toISOString() },
      { onConflict: 'key' },
    )
  if (error) throw new Error(error.message)
}

async function fetchMembers() {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) throw new Error(error.message)
  return data || []
}

export function usePublicTeam() {
  const [team, setTeam]         = useState(staticTeam)
  const [advisors, setAdvisors] = useState(staticAdvisors)
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    Promise.all([fetchMembers().catch(() => []), fetchHiddenIds().catch(() => [])])
      .then(([members, hiddenIds]) => {
        const rows = mergeRoster(members, hiddenIds)
        setTeam(rows.filter(r => r.section === 'team'))
        setAdvisors(rows.filter(r => r.section === 'advisors'))
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
    try {
      const [members, hiddenIds] = await Promise.all([fetchMembers(), fetchHiddenIds()])
      setError(null)
      setRows(mergeRoster(members, hiddenIds))
    } catch (err) {
      setError(err.message)
      setRows(staticDefaults())
    }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const upsert = useCallback(async (form, existingId) => {
    const payload = appTeamToDb(form, existingId)
    const { data, error: err } = await supabase
      .from('team_members')
      .upsert(payload, { onConflict: 'id' })
      .select('id')
      .maybeSingle()

    if (err) throw new Error(err.message)
    if (!data?.id) throw new Error('Save failed — no row returned. Check INSERT policy on team_members.')

    // If this id was soft-hidden, un-hide so the profile shows in admin + public
    const hiddenIds = await fetchHiddenIds()
    if (hiddenIds.includes(payload.id)) {
      await saveHiddenIds(hiddenIds.filter(id => id !== payload.id))
    }

    await load()
  }, [])

  const remove = useCallback(async (id) => {
    await supabase.from('team_members').delete().eq('id', id)
    // Soft-hide so static defaults do not reappear on About / admin
    const hiddenIds = await fetchHiddenIds()
    if (!hiddenIds.includes(id)) {
      await saveHiddenIds([...hiddenIds, id])
    }
    setRows(prev => prev.filter(r => r.id !== id))
    await load()
  }, [])

  return { rows, loading, error, upsert, remove, refresh: load }
}
