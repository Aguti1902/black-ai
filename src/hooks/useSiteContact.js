import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'
import { defaultContact } from '../data/siteContact.js'

const SETTINGS_KEY = 'contact_info'

export function useSiteContact() {
  const [contact, setContact] = useState(defaultContact)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('site_settings')
      .select('value')
      .eq('key', SETTINGS_KEY)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.value) {
          setContact({ ...defaultContact, ...data.value, social: { ...defaultContact.social, ...data.value.social } })
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return { contact, loading }
}

export async function saveSiteContact(contact) {
  const { error } = await supabase
    .from('site_settings')
    .upsert({ key: SETTINGS_KEY, value: contact, updated_at: new Date().toISOString() }, { onConflict: 'key' })
  if (error) throw new Error(error.message)
}
