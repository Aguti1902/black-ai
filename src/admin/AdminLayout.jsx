import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate, Outlet } from 'react-router-dom'
import { LayoutDashboard, FileText, FolderOpen, LogOut, Image, BarChart2, Users, Mail } from 'lucide-react'
import { supabase } from '../lib/supabase.js'

const NAV = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/blog',      icon: FileText,        label: 'Blog / News' },
  { to: '/admin/projects',  icon: FolderOpen,      label: 'Projects' },
  { to: '/admin/metrics',   icon: BarChart2,       label: 'Metrics & Map' },
  { to: '/admin/team',      icon: Users,           label: 'Team' },
  { to: '/admin/contact',   icon: Mail,            label: 'Contact & Social' },
  { to: '/admin/images',    icon: Image,           label: 'Images' },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/admin/login', { replace: true })
      else setChecking(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) navigate('/admin/login', { replace: true })
    })
    return () => subscription.unsubscribe()
  }, [navigate])

  async function logout() {
    await supabase.auth.signOut()
    navigate('/admin/login', { replace: true })
  }

  if (checking) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#050508', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
          Loading…
        </span>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#070710', color: 'white', fontFamily: '"Space Grotesk", system-ui, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: '240px', flexShrink: 0, borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', backgroundColor: '#050508' }}>
        <div style={{ padding: '28px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <Link to="/" target="_blank" style={{ textDecoration: 'none' }}>
            <span style={{ fontWeight: 700, fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'white' }}>Black AI</span>
          </Link>
          <p style={{ marginTop: '4px', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.28)' }}>Admin Panel</p>
        </div>

        <nav style={{ flex: 1, padding: '16px 0' }}>
          {NAV.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '11px 24px', fontSize: '0.8rem', fontWeight: 600,
                textDecoration: 'none', transition: 'all 0.15s',
                backgroundColor: isActive ? 'rgba(200,169,110,0.1)' : 'transparent',
                color: isActive ? '#C8A96E' : 'rgba(255,255,255,0.45)',
                borderLeft: isActive ? '2px solid #C8A96E' : '2px solid transparent',
              })}
            >
              <Icon size={15} /> {label}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button onClick={logout}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#ff6b6b'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, overflowY: 'auto', minHeight: '100vh' }}>
        <Outlet />
      </main>
    </div>
  )
}
