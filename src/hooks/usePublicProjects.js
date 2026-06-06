import { useState, useEffect } from 'react'
import { supabase, dbProjectToApp } from '../lib/supabase.js'
import { projects as staticProjects } from '../data/projects.js'

export function usePublicProjects() {
  const [projects, setProjects] = useState(staticProjects)
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    supabase.from('projects').select('*').order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) {
          const ids = new Set(data.map(r => r.id))
          const fallback = staticProjects.filter(p => !ids.has(p.id))
          setProjects([...data.map(dbProjectToApp), ...fallback])
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return { projects, loading }
}
