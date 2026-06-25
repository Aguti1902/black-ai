import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Pencil, Trash2, Plus, ArrowLeft, Save, Loader } from 'lucide-react'
import { useAdminProjects } from './useAdminData.js'

const s = {
  page:    { padding: '40px 48px', maxWidth: '960px' },
  topbar:  { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' },
  h1:      { fontWeight: 700, fontSize: '1.3rem', letterSpacing: '0.04em', color: 'white' },
  btn:     { display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', backgroundColor: '#C8A96E', color: '#050508', fontWeight: 700, fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', border: 'none', cursor: 'pointer' },
  btnGhost:{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 16px', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.55)', fontWeight: 600, fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', background: 'none', cursor: 'pointer' },
  row:     { display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '14px 0', gap: '12px' },
  img:     { width: 64, height: 42, objectFit: 'cover', backgroundColor: 'rgba(255,255,255,0.04)', flexShrink: 0 },
  err:     { padding: '10px 16px', backgroundColor: 'rgba(255,100,100,0.1)', border: '1px solid rgba(255,100,100,0.25)', color: '#ff9999', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', marginBottom: '16px' },
}

export function AdminProjectsList() {
  const { rows, loading, remove } = useAdminProjects()
  const navigate = useNavigate()

  return (
    <div style={s.page}>
      <div style={s.topbar}>
        <h1 style={s.h1}>Projects</h1>
        <Link to="/admin/projects/new" style={s.btn}><Plus size={13} /> New Project</Link>
      </div>

      {loading ? (
        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Loader size={14} className="animate-spin" /> Loading projects…
        </div>
      ) : rows.map(p => (
        <div key={p.id} style={s.row}>
          {p.imageSrc && (
            <img src={p.imageSrc} alt="" style={s.img} onError={e => e.target.style.display='none'} />
          )}
          <div style={{ flex: 1 }}>
            <div style={{ color: 'white', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>{p.name}</div>
            <div style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.72rem', fontFamily: 'Inter, sans-serif' }}>
              {p.region} · {p.capacity} · {p._source === 'supabase' ? 'Supabase' : 'Static'}
            </div>
          </div>
          <button onClick={() => navigate(`/admin/projects/${p.id}`)} style={s.btnGhost}>
            <Pencil size={13} /> Edit
          </button>
          {p._source === 'supabase' && (
            <button onClick={async () => { if (confirm('Delete?')) await remove(p.id) }} style={{ ...s.btnGhost, color: '#ff6b6b', borderColor: 'rgba(255,100,100,0.2)' }}>
              <Trash2 size={13} />
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

const EMPTY = { name:'', region:'Europe', capacity:'', tags:'', locationEn:'', locationEs:'', statusEn:'Development Phase', statusEs:'', taglineEn:'', taglineEs:'', descEn:'', descEs:'', highlightsEn:'', highlightsEs:'', imageSrc:'', pdfSrc:'', mapLng:'', mapLat:'' }

function rowToForm(existing) {
  return {
    name:         existing.name         || '',
    region:       existing.region       || 'Europe',
    capacity:     existing.capacity     || '',
    tags:         (existing.tags || []).join(', '),
    locationEn:   existing.location?.en || '',
    locationEs:   existing.location?.es || '',
    statusEn:     existing.status?.en   || 'Development Phase',
    statusEs:     existing.status?.es   || '',
    taglineEn:    existing.tagline?.en  || '',
    taglineEs:    existing.tagline?.es  || '',
    descEn:       existing.description?.en || '',
    descEs:       existing.description?.es || '',
    highlightsEn: (existing.highlights?.en || []).join('\n'),
    highlightsEs: (existing.highlights?.es || []).join('\n'),
    imageSrc:     existing.imageSrc     || '',
    pdfSrc:       existing.pdfSrc       || '',
    mapLng:       existing.mapLng ?? '',
    mapLat:       existing.mapLat ?? '',
  }
}

export function AdminProjectEditor() {
  const { id }   = useParams()
  const isNew    = id === 'new'
  const navigate = useNavigate()
  const { rows, loading, upsert } = useAdminProjects()

  const [form, setForm]         = useState(EMPTY)
  const [hydrated, setHydrated] = useState(false)
  const [saving, setSaving]     = useState(false)
  const [error, setError]       = useState('')

  useEffect(() => {
    if (!isNew && !hydrated && !loading && rows.length > 0) {
      const existing = rows.find(r => r.id === id)
      if (existing) {
        setForm(rowToForm(existing))
        setHydrated(true)
      }
    }
  }, [rows, loading, id, isNew, hydrated])

  function set(k, v) { setForm(f => ({ ...f, [k]: v })) }

  async function save() {
    if (!form.name) { setError('Name is required'); return }
    setSaving(true); setError('')
    try {
      await upsert(form, isNew ? undefined : id)
      navigate('/admin/projects')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const F = ({ label, field, multiline = false, rows: r = 3, hint }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)', fontFamily: '"Space Grotesk", sans-serif' }}>
        {label} {hint && <span style={{ textTransform: 'none', letterSpacing: 0, color: 'rgba(255,255,255,0.2)' }}>({hint})</span>}
      </label>
      {multiline
        ? <textarea value={form[field]} onChange={e => set(field, e.target.value)} rows={r}
            style={{ backgroundColor: '#0A0A12', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', padding: '10px 12px', outline: 'none', resize: 'vertical', borderRadius: 0 }} />
        : <input value={form[field]} onChange={e => set(field, e.target.value)}
            style={{ backgroundColor: '#0A0A12', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', padding: '10px 12px', outline: 'none', borderRadius: 0 }} />
      }
    </div>
  )

  if (!isNew && loading && !hydrated) {
    return (
      <div style={{ ...s.page, display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.3)' }}>
        <Loader size={16} className="animate-spin" /> Loading project…
      </div>
    )
  }

  return (
    <div style={s.page}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <Link to="/admin/projects" style={{ ...s.btnGhost, padding: '8px 12px' }}><ArrowLeft size={14} /></Link>
        <h1 style={s.h1}>{isNew ? 'New Project' : 'Edit Project'}</h1>
      </div>

      {error && <div style={s.err}>{error}</div>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <F label="Project Name *" field="name" />
          <F label="Region" field="region" />
          <F label="Capacity" field="capacity" />
        </div>
        <F label="Tags" field="tags" hint="comma separated" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <F label="Location (EN)" field="locationEn" />
          <F label="Location (ES)" field="locationEs" />
          <F label="Status (EN)" field="statusEn" />
          <F label="Status (ES)" field="statusEs" />
          <F label="Tagline (EN)" field="taglineEn" />
          <F label="Tagline (ES)" field="taglineEs" />
          <F label="Description (EN)" field="descEn" multiline rows={5} />
          <F label="Description (ES)" field="descEs" multiline rows={5} />
          <F label="Highlights (EN)" field="highlightsEn" multiline rows={4} hint="one per line" />
          <F label="Highlights (ES)" field="highlightsEs" multiline rows={4} hint="one per line" />
          <F label="Cover Image URL" field="imageSrc" />
          <F label="PDF URL (Supabase Storage)" field="pdfSrc" />
        </div>

        {/* Map coordinates — homepage interactive map */}
        <div style={{ padding: '20px', border: '1px solid rgba(200,169,110,0.25)', backgroundColor: 'rgba(200,169,110,0.04)' }}>
          <p style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#C8A96E', marginBottom: '6px', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 }}>
            Homepage Map Marker
          </p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter, sans-serif', marginBottom: '16px', lineHeight: 1.5 }}>
            Set coordinates to show this project on the interactive world map. Find them in Google Maps → right-click a point → copy coordinates (first number = Longitude, second = Latitude).
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <F label="Map Longitude" field="mapLng" hint="e.g. -8.82 for Spain" />
            <F label="Map Latitude" field="mapLat" hint="e.g. 43.33 for Spain" />
          </div>
          {form.mapLng && form.mapLat && (
            <p style={{ marginTop: '12px', fontSize: '0.72rem', color: 'rgba(74,222,128,0.8)', fontFamily: 'Inter, sans-serif' }}>
              ✓ This project will appear on the homepage map after saving.
            </p>
          )}
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button onClick={save} disabled={saving} style={{ ...s.btn, opacity: saving ? 0.7 : 1 }}>
            {saving ? <Loader size={13} className="animate-spin" /> : <Save size={13} />}
            {saving ? 'Saving…' : 'Save Project'}
          </button>
          <Link to="/admin/projects" style={s.btnGhost}>Cancel</Link>
        </div>
      </div>
    </div>
  )
}
