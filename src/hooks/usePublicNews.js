import { useState, useEffect } from 'react'
import { supabase, dbNewsToApp } from '../lib/supabase.js'
import { fetchGalleryOverrides, withGalleryOverride } from '../lib/newsGallery.js'
import { news as staticNews } from '../data/news.js'

/**
 * Merge Supabase rows with static data.
 * Supabase rows take precedence (override static with same id).
 */
export function usePublicNews() {
  const [news, setNews]       = useState(staticNews)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      supabase.from('news').select('*').order('created_at', { ascending: false }),
      fetchGalleryOverrides(),
    ])
      .then(([{ data }, overrides]) => {
        if (data && data.length > 0) {
          const ids = new Set(data.map(r => r.id))
          const fallback = staticNews.filter(n => !ids.has(n.id)).map(n => withGalleryOverride(n, overrides))
          setNews([...data.map(r => dbNewsToApp(r, overrides)), ...fallback])
        } else {
          setNews(staticNews.map(n => withGalleryOverride(n, overrides)))
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
    Promise.all([
      supabase.from('news').select('*').eq('id', id).single(),
      fetchGalleryOverrides(),
    ])
      .then(([{ data }, overrides]) => {
        if (data) {
          setItem(dbNewsToApp(data, overrides))
        } else {
          const fallback = staticNews.find(n => n.id === id)
          setItem(fallback ? withGalleryOverride(fallback, overrides) : null)
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
