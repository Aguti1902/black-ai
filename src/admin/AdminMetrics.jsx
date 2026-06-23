import { useState, useEffect } from 'react'
import { Save, Loader, BarChart2 } from 'lucide-react'
import { defaultMetrics } from '../data/siteMetrics.js'
import { saveSiteMetrics } from '../hooks/useSiteMetrics.js'
import { supabase } from '../lib/supabase.js'

const s = {
  page: { padding: '40px 48px', maxWidth: '760px' },
  h1: { fontWeight: 700, fontSize: '1.3rem', letterSpacing: '0.04em', color: 'white', marginBottom: '8px' },
  sub: { color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '32px' },
  btn: { display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', backgroundColor: '#C8A96E', color: '#050508', fontWeight: 700, fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.1em', border: 'none', cursor: 'pointer' },
  card: { padding: '20px', border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.02)', marginBottom: '16px' },
  err: { padding: '10px 16px', backgroundColor: 'rgba(255,100,100,0.1)', border: '1px solid rgba(255,100,100,0.25)', color: '#ff9999', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', marginBottom: '16px' },
  ok:  { padding: '10px 16px', backgroundColor: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.25)', color: '#4ade80', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', marginBottom: '16px' },
}

const inputStyle = {
  backgroundColor: '#0A0A12', border: '1px solid rgba(255,255,255,0.1)', color: 'white',
  fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', padding: '10px 12px', outline: 'none', width: '100%',
}

export default function AdminMetrics() {
  const [metrics, setMetrics] = useState(defaultMetrics)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    supabase.from('site_settings').select('value').eq('key', 'homepage_metrics').maybeSingle()
      .then(({ data, error: err }) => {
        if (data?.value) setMetrics(data.value)
        if (err) setError('Could not load from Supabase — using defaults. Run the site_settings SQL if not done yet.')
        setLoading(false)
      })
  }, [])

  function update(i, field, val) {
    setMetrics(prev => prev.map((m, idx) => idx === i ? { ...m, [field]: val } : m))
  }

  async function save() {
    setSaving(true); setError(''); setSuccess('')
    try {
      await saveSiteMetrics(metrics)
      setSuccess('Metrics saved — changes appear on the homepage immediately.')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div style={{ ...s.page, display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.3)' }}>
        <Loader size={14} className="animate-spin" /> Loading…
      </div>
    )
  }

  return (
    <div style={s.page}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
        <BarChart2 size={18} style={{ color: '#C8A96E' }} />
        <h1 style={s.h1}>Homepage Metrics</h1>
      </div>
      <p style={s.sub}>
        Edit the live capacity numbers shown on the homepage. To update map markers, edit each project in{' '}
        <strong style={{ color: 'rgba(255,255,255,0.55)' }}>Projects</strong> and set Map Longitude / Latitude.
      </p>

      {error   && <div style={s.err}>{error}</div>}
      {success && <div style={s.ok}>{success}</div>}

      {metrics.map((m, i) => (
        <div key={m.id} style={s.card}>
          <p style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#C8A96E', marginBottom: '14px', fontFamily: '"Space Grotesk", sans-serif' }}>
            Metric {i + 1}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Label (EN)</label>
              <input style={inputStyle} value={m.labelEn} onChange={e => update(i, 'labelEn', e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Label (ES)</label>
              <input style={inputStyle} value={m.labelEs} onChange={e => update(i, 'labelEs', e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Value</label>
              <input style={inputStyle} type="number" step="any" value={m.value} onChange={e => update(i, 'value', parseFloat(e.target.value) || 0)} />
            </div>
            <div>
              <label style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Unit (e.g. MW, B USD)</label>
              <input style={inputStyle} value={m.unit} onChange={e => update(i, 'unit', e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Prefix (e.g. $)</label>
              <input style={inputStyle} value={m.prefix || ''} onChange={e => update(i, 'prefix', e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Live counter</label>
              <select style={inputStyle} value={m.live ? 'yes' : 'no'} onChange={e => update(i, 'live', e.target.value === 'yes')}>
                <option value="yes">Yes — animated green dot</option>
                <option value="no">No — static number</option>
              </select>
            </div>
          </div>
        </div>
      ))}

      <button onClick={save} disabled={saving} style={{ ...s.btn, opacity: saving ? 0.7 : 1 }}>
        {saving ? <Loader size={13} className="animate-spin" /> : <Save size={13} />}
        {saving ? 'Saving…' : 'Save Metrics'}
      </button>
    </div>
  )
}
