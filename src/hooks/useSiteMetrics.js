import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'
import { defaultMetrics } from '../data/siteMetrics.js'

const SETTINGS_KEY = 'homepage_metrics'

export function useSiteMetrics() {
  const [metrics, setMetrics] = useState(defaultMetrics)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('site_settings')
      .select('value')
      .eq('key', SETTINGS_KEY)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.value && Array.isArray(data.value)) {
          setMetrics(data.value)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return { metrics, loading }
}

export async function saveSiteMetrics(metrics) {
  const { error } = await supabase
    .from('site_settings')
    .upsert({ key: SETTINGS_KEY, value: metrics, updated_at: new Date().toISOString() }, { onConflict: 'key' })
  if (error) throw new Error(error.message)
}
