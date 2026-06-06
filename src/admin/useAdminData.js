import { useState, useEffect, useCallback } from 'react'
import { supabase, dbNewsToApp, appNewsToDb, dbProjectToApp, appProjectToDb } from '../lib/supabase.js'
import { news as staticNews }         from '../data/news.js'
import { projects as staticProjects } from '../data/projects.js'

/* ── NEWS ──────────────────────────────────────────────── */
export function useAdminNews() {
  const [rows, setRows]       = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  async function load() {
    setLoading(true)
    const { data, error: err } = await supabase.from('news').select('*').order('created_at', { ascending: false })
    if (err) {
      setError(err.message)
      setRows(staticNews)
    } else {
      const supabaseIds = new Set((data || []).map(r => r.id))
      const fallback = staticNews.filter(n => !supabaseIds.has(n.id))
      setRows([...(data || []).map(dbNewsToApp), ...fallback])
    }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const upsert = useCallback(async (form, existingId) => {
    const payload = appNewsToDb(form, existingId)
    const { error: err } = await supabase.from('news').upsert(payload, { onConflict: 'id' })
    if (err) throw new Error(err.message)
    await load()
  }, [])

  const remove = useCallback(async (id) => {
    await supabase.from('news').delete().eq('id', id)
    setRows(prev => prev.filter(r => r.id !== id))
  }, [])

  return { rows, loading, error, upsert, remove, refresh: load }
}

/* ── PROJECTS ──────────────────────────────────────────── */
export function useAdminProjects() {
  const [rows, setRows]       = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  async function load() {
    setLoading(true)
    const { data, error: err } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
    if (err) {
      setError(err.message)
      setRows(staticProjects)
    } else {
      const supabaseIds = new Set((data || []).map(r => r.id))
      const fallback = staticProjects.filter(p => !supabaseIds.has(p.id))
      setRows([...(data || []).map(dbProjectToApp), ...fallback])
    }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const upsert = useCallback(async (form, existingId) => {
    const payload = appProjectToDb(form, existingId)
    const { error: err } = await supabase.from('projects').upsert(payload, { onConflict: 'id' })
    if (err) throw new Error(err.message)
    await load()
  }, [])

  const remove = useCallback(async (id) => {
    await supabase.from('projects').delete().eq('id', id)
    setRows(prev => prev.filter(r => r.id !== id))
  }, [])

  return { rows, loading, error, upsert, remove, refresh: load }
}
