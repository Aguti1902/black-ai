import { useState, useEffect, useCallback } from 'react'
import { supabase, dbTeamToApp, appTeamToDb } from '../lib/supabase.js'
import { team as staticTeam, advisors as staticAdvisors } from '../data/team.js'

const MEMBERS_KEY = 'team_members'
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

function mergeRoster(dbRows, hiddenIds) {
  const hidden = new Set(hiddenIds || [])
  const byId = new Map()

  for (const row of dbRows || []) {
    const app = dbTeamToApp(row)
    byId.set(app.id, app)
  }

  for (const item of staticDefaults()) {
    if (hidden.has(item.id) || byId.has(item.id)) continue
    byId.set(item.id, item)
  }

  return [...byId.values()].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
}

async function fetchRoster() {
  const { data, error } = await supabase
    .from('site_settings')
    .select('key, value')
    .in('key', [MEMBERS_KEY, HIDDEN_KEY])

  if (error) throw new Error(error.message)

  const map = Object.fromEntries((data || []).map(r => [r.key, r.value]))
  const members = Array.isArray(map[MEMBERS_KEY]) ? map[MEMBERS_KEY] : []
  const hiddenIds = Array.isArray(map[HIDDEN_KEY]) ? map[HIDDEN_KEY] : []
  return { members, hiddenIds }
}

async function saveSetting(key, value) {
  const { error } = await supabase
    .from('site_settings')
    .upsert(
      { key, value, updated_at: new Date().toISOString() },
      { onConflict: 'key' },
    )
  if (error) throw new Error(error.message)
}

export function usePublicTeam() {
  const [team, setTeam]         = useState(staticTeam)
  const [advisors, setAdvisors] = useState(staticAdvisors)
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    fetchRoster()
      .then(({ members, hiddenIds }) => {
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
      const { members, hiddenIds } = await fetchRoster()
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
    const { members, hiddenIds } = await fetchRoster()
    const next = [...members.filter(m => m.id !== payload.id), payload]
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    await saveSetting(MEMBERS_KEY, next)
    if (hiddenIds.includes(payload.id)) {
      await saveSetting(HIDDEN_KEY, hiddenIds.filter(id => id !== payload.id))
    }
    await load()
  }, [])

  const remove = useCallback(async (id) => {
    const { members, hiddenIds } = await fetchRoster()
    const nextMembers = members.filter(m => m.id !== id)
    const nextHidden = hiddenIds.includes(id) ? hiddenIds : [...hiddenIds, id]
    await saveSetting(MEMBERS_KEY, nextMembers)
    await saveSetting(HIDDEN_KEY, nextHidden)
    setRows(prev => prev.filter(r => r.id !== id))
    await load()
  }, [])

  return { rows, loading, error, upsert, remove, refresh: load }
}
