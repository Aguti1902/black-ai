import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [pass, setPass]   = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password: pass })
    if (authError) {
      setError(authError.message)
      setLoading(false)
    } else {
      navigate('/admin/dashboard', { replace: true })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#050508' }}>
      <div style={{ width: '100%', maxWidth: '440px', padding: '0 24px' }}>
        <div className="mb-10 text-center">
          <span style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', fontSize: '1.4rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'white' }}>
            Black AI
          </span>
          <p style={{ marginTop: '4px', fontFamily: '"Space Grotesk", system-ui, sans-serif', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)' }}>
            Admin Panel
          </p>
        </div>

        <div style={{ border: '1px solid rgba(255,255,255,0.08)', padding: '40px', backgroundColor: '#0A0A12' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              { label: 'Email', type: 'email', value: email, set: setEmail, placeholder: 'admin@black-ai.com' },
              { label: 'Password', type: 'password', value: pass, set: setPass, placeholder: '••••••••••••' },
            ].map(({ label, type, value, set, placeholder }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)' }}>
                  {label}
                </label>
                <input
                  type={type} value={value} onChange={e => set(e.target.value)}
                  placeholder={placeholder} required
                  style={{ backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.12)', color: 'white', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', padding: '10px 0', outline: 'none', width: '100%', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderBottomColor = '#C8A96E'}
                  onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.12)'}
                />
              </div>
            ))}

            {error && (
              <p style={{ color: '#ff6b6b', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', marginTop: '-8px' }}>
                {error}
              </p>
            )}

            <button
              type="submit" disabled={loading}
              style={{ marginTop: '8px', backgroundColor: '#C8A96E', color: '#050508', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '14px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.65 : 1, transition: 'opacity 0.2s' }}
            >
              {loading ? 'Signing in…' : 'Sign In →'}
            </button>
          </form>
        </div>

        <p style={{ marginTop: '24px', textAlign: 'center', color: 'rgba(255,255,255,0.18)', fontFamily: 'Inter, sans-serif', fontSize: '0.72rem' }}>
          Black AI © 2026 · Admin Access Only
        </p>
      </div>
    </div>
  )
}
