import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'
import { news as staticNews }         from '../data/news.js'
import { projects as staticProjects } from '../data/projects.js'
import { Newspaper, FolderOpen, ImageIcon, Plus } from 'lucide-react'

const s = {
  page:   { padding: '40px 48px', maxWidth: '1100px' },
  h1:     { fontWeight: 700, fontSize: '1.5rem', letterSpacing: '0.04em', color: 'white', marginBottom: '6px' },
  sub:    { color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', marginBottom: '40px' },
  grid:   { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' },
  card:   { border: '1px solid rgba(255,255,255,0.07)', backgroundColor: '#0A0A12', padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px' },
  num:    { fontSize: '2.2rem', fontWeight: 700, color: '#C8A96E', letterSpacing: '-0.02em' },
  label:  { fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.3)', marginTop: '-10px' },
  btn:    { display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '12px 24px', backgroundColor: '#C8A96E', color: '#050508', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none' },
  btnGhost: { display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.55)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', transition: 'all 0.15s' },
  actions: { display: 'flex', gap: '12px', flexWrap: 'wrap' },
  sTitle: { fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' },
}

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ news: 0, projects: 0 })

  useEffect(() => {
    async function load() {
      const [{ count: newsCount }, { count: projCount }] = await Promise.all([
        supabase.from('news').select('id', { count: 'exact', head: true }),
        supabase.from('projects').select('id', { count: 'exact', head: true }),
      ])
      setCounts({
        news:     (newsCount     || 0) + staticNews.length,
        projects: (projCount     || 0) + staticProjects.length,
      })
    }
    load()
  }, [])

  const cards = [
    { icon: Newspaper,  label: 'Blog Posts', count: counts.news,     link: '/admin/blog' },
    { icon: FolderOpen, label: 'Projects',   count: counts.projects, link: '/admin/projects' },
    { icon: ImageIcon,  label: 'Media',      count: '∞',             link: '/admin/images' },
  ]

  return (
    <div style={s.page}>
      <h1 style={s.h1}>Dashboard</h1>
      <p style={s.sub}>Black AI · Content Management</p>

      <div style={s.grid}>
        {cards.map(({ icon: Icon, label, count, link }) => (
          <Link key={label} to={link} style={{ textDecoration: 'none' }}>
            <div style={s.card}>
              <Icon size={18} color="rgba(255,255,255,0.25)" />
              <div>
                <div style={s.num}>{count}</div>
                <div style={s.label}>{label}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div>
        <p style={s.sTitle}>Quick Actions</p>
        <div style={s.actions}>
          <Link to="/admin/blog/new" style={s.btn}><Plus size={13} /> New Article</Link>
          <Link to="/admin/projects/new" style={s.btn}><Plus size={13} /> New Project</Link>
          <Link to="/admin/images" style={s.btnGhost}><ImageIcon size={13} /> Manage Images</Link>
        </div>
      </div>
    </div>
  )
}
