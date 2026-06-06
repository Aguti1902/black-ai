import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Pencil, Trash2, Plus, ArrowLeft, Save, Loader } from 'lucide-react'
import { useAdminNews } from './useAdminData.js'

const s = {
  page:    { padding: '40px 48px', maxWidth: '900px' },
  topbar:  { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' },
  h1:      { fontWeight: 700, fontSize: '1.3rem', letterSpacing: '0.04em', color: 'white' },
  btn:     { display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', backgroundColor: '#C8A96E', color: '#050508', fontWeight: 700, fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', border: 'none', cursor: 'pointer' },
  btnGhost:{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 16px', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.55)', fontWeight: 600, fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', background: 'none', cursor: 'pointer' },
  row:     { display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '16px 0', gap: '12px' },
  img:     { width: 56, height: 42, objectFit: 'cover', backgroundColor: 'rgba(255,255,255,0.04)', flexShrink: 0 },
  title:   { flex: 1, color: 'white', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', lineHeight: 1.4 },
  meta:    { color: 'rgba(255,255,255,0.28)', fontFamily: 'Inter, sans-serif', fontSize: '0.72rem' },
  err:     { padding: '10px 16px', backgroundColor: 'rgba(255,100,100,0.1)', border: '1px solid rgba(255,100,100,0.25)', color: '#ff9999', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', marginBottom: '16px' },
}

/* ── List ───────────────────────────────────────────── */
export function AdminBlogList() {
  const { rows, loading, remove } = useAdminNews()
  const navigate = useNavigate()

  async function handleDelete(id) {
    if (!confirm('Delete this article?')) return
    await remove(id)
  }

  return (
    <div style={s.page}>
      <div style={s.topbar}>
        <h1 style={s.h1}>Blog / News</h1>
        <Link to="/admin/blog/new" style={s.btn}><Plus size={13} /> New Article</Link>
      </div>

      {loading ? (
        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Loader size={14} className="animate-spin" /> Loading articles…
        </div>
      ) : rows.map(item => {
        const title = typeof item.title === 'object' ? item.title.en : item.title
        const date  = typeof item.date  === 'object' ? item.date.en  : item.date
        return (
          <div key={item.id} style={s.row}>
            {item.imageSrc && (
              <img src={item.imageSrc} alt="" style={s.img} onError={e => e.target.style.display='none'} />
            )}
            <div style={s.title}>
              <div>{title}</div>
              <div style={s.meta}>{date} · {item._source === 'supabase' ? 'Supabase' : 'Static'}</div>
            </div>
            <button onClick={() => navigate(`/admin/blog/${item.id}`)} style={s.btnGhost}>
              <Pencil size={13} /> Edit
            </button>
            {item._source === 'supabase' && (
              <button onClick={() => handleDelete(item.id)} style={{ ...s.btnGhost, color: '#ff6b6b', borderColor: 'rgba(255,100,100,0.2)' }}>
                <Trash2 size={13} />
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ── Editor ─────────────────────────────────────────── */
const EMPTY = { titleEn:'', titleEs:'', excerptEn:'', excerptEs:'', bodyEn:'', bodyEs:'', categoryEn:'', categoryEs:'', dateEn:'', dateEs:'', imageSrc:'' }

function rowToForm(existing) {
  return {
    titleEn:    existing.title?.en    || existing.title    || '',
    titleEs:    existing.title?.es    || '',
    excerptEn:  existing.excerpt?.en  || existing.excerpt  || '',
    excerptEs:  existing.excerpt?.es  || '',
    bodyEn:     existing.body?.en     || '',
    bodyEs:     existing.body?.es     || '',
    categoryEn: existing.category?.en || existing.category || '',
    categoryEs: existing.category?.es || '',
    dateEn:     existing.date?.en     || existing.date     || '',
    dateEs:     existing.date?.es     || '',
    imageSrc:   existing.imageSrc     || '',
  }
}

export function AdminBlogEditor() {
  const { id }  = useParams()
  const isNew   = id === 'new'
  const navigate = useNavigate()
  const { rows, loading, upsert } = useAdminNews()

  const [form, setForm]       = useState(EMPTY)
  const [hydrated, setHydrated] = useState(false)
  const [saving, setSaving]   = useState(false)
  const [error, setError]     = useState('')

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
    if (!form.titleEn) { setError('Title (EN) is required'); return }
    setSaving(true); setError('')
    try {
      await upsert(form, isNew ? undefined : id)
      navigate('/admin/blog')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const F = ({ label, field, multiline = false, rows: r = 3 }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)', fontFamily: '"Space Grotesk", sans-serif' }}>{label}</label>
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
        <Loader size={16} className="animate-spin" /> Loading article…
      </div>
    )
  }

  return (
    <div style={s.page}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <Link to="/admin/blog" style={{ ...s.btnGhost, padding: '8px 12px' }}><ArrowLeft size={14} /></Link>
        <h1 style={s.h1}>{isNew ? 'New Article' : 'Edit Article'}</h1>
      </div>

      {error && <div style={s.err}>{error}</div>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <F label="Title (EN) *" field="titleEn" />
          <F label="Title (ES)" field="titleEs" />
          <F label="Excerpt (EN)" field="excerptEn" multiline rows={2} />
          <F label="Excerpt (ES)" field="excerptEs" multiline rows={2} />
          <F label="Body (EN)" field="bodyEn" multiline rows={6} />
          <F label="Body (ES)" field="bodyEs" multiline rows={6} />
          <F label="Category (EN)" field="categoryEn" />
          <F label="Category (ES)" field="categoryEs" />
          <F label="Date (EN) — e.g. June 2026" field="dateEn" />
          <F label="Date (ES) — e.g. Junio 2026" field="dateEs" />
        </div>
        <F label="Image URL (or Supabase Storage path)" field="imageSrc" />

        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button onClick={save} disabled={saving} style={{ ...s.btn, opacity: saving ? 0.7 : 1 }}>
            {saving ? <Loader size={13} className="animate-spin" /> : <Save size={13} />}
            {saving ? 'Saving…' : 'Save Article'}
          </button>
          <Link to="/admin/blog" style={s.btnGhost}>Cancel</Link>
        </div>
      </div>
    </div>
  )
}
