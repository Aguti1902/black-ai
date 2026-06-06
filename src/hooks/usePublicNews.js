import { useState, useEffect } from 'react'
import { supabase, dbNewsToApp } from '../lib/supabase.js'
import { news as staticNews } from '../data/news.js'

/**
 * Merge Supabase rows with static data.
 * Supabase rows take precedence (override static with same id).
 */
export function usePublicNews() {
  const [news, setNews]       = useState(staticNews)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('news').select('*').order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) {
          const ids = new Set(data.map(r => r.id))
          const fallback = staticNews.filter(n => !ids.has(n.id))
          setNews([...data.map(dbNewsToApp), ...fallback])
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return { news, loading }
}

export function usePublicNewsById(id) {
  const [item, setItem]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) { setLoading(false); return }
    supabase.from('news').select('*').eq('id', id).single()
      .then(({ data }) => {
        if (data) {
          setItem(dbNewsToApp(data))
        } else {
          setItem(staticNews.find(n => n.id === id) || null)
        }
        setLoading(false)
      })
      .catch(() => {
        setItem(staticNews.find(n => n.id === id) || null)
        setLoading(false)
      })
  }, [id])

  return { item, loading }
}
