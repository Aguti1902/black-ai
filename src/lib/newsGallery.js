import { supabase, normalizeGallery } from './supabase.js'

/**
 * Article galleries live in the `news.gallery` jsonb column (see
 * supabase-news-gallery.sql). While that column has not been added yet the
 * same data is kept in the generic `site_settings` key/value table, so the
 * gallery keeps working without touching the database schema.
 */
const SETTINGS_KEY = 'news_galleries'

export function isMissingGalleryColumn(error) {
  if (!error) return false
  const text = `${error.message || ''} ${error.details || ''} ${error.hint || ''}`.toLowerCase()
  return text.includes('gallery') && (
    error.code === 'PGRST204' ||
    error.code === '42703' ||
    text.includes('does not exist') ||
    text.includes('schema cache')
  )
}

export async function fetchGalleryOverrides() {
  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', SETTINGS_KEY)
    .maybeSingle()
  if (error || !data?.value || typeof data.value !== 'object' || Array.isArray(data.value)) return {}
  return data.value
}

export async function saveGalleryOverride(newsId, gallery) {
  const next = { ...(await fetchGalleryOverrides()) }
  const clean = normalizeGallery(gallery)
  if (clean.length) next[newsId] = clean
  else delete next[newsId]

  const { error } = await supabase
    .from('site_settings')
    .upsert({ key: SETTINGS_KEY, value: next, updated_at: new Date().toISOString() }, { onConflict: 'key' })
  if (error) throw new Error(error.message)
}

export function withGalleryOverride(item, overrides) {
  return { ...item, gallery: normalizeGallery(item.gallery ?? overrides?.[item.id]) }
}
