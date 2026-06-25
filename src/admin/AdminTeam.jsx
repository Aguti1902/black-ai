import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Pencil, Trash2, Plus, ArrowLeft, Save, Loader, Upload, Users } from 'lucide-react'
import { useAdminTeam } from '../hooks/usePublicTeam.js'
import { supabase } from '../lib/supabase.js'

const BUCKET = 'images'

const s = {
  page:    { padding: '40px 48px', maxWidth: '900px' },
  topbar:  { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' },
  h1:      { fontWeight: 700, fontSize: '1.3rem', letterSpacing: '0.04em', color: 'white' },
  btn:     { display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', backgroundColor: '#C8A96E', color: '#050508', fontWeight: 700, fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', border: 'none', cursor: 'pointer' },
  btnGhost:{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 16px', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.55)', fontWeight: 600, fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', background: 'none', cursor: 'pointer' },
  row:     { display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '14px 0', gap: '12px' },
  img:     { width: 48, height: 48, objectFit: 'cover', borderRadius: 0, backgroundColor: 'rgba(255,255,255,0.04)', flexShrink: 0 },
  err:     { padding: '10px 16px', backgroundColor: 'rgba(255,100,100,0.1)', border: '1px solid rgba(255,100,100,0.25)', color: '#ff9999', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', marginBottom: '16px' },
  ok:      { padding: '10px 16px', backgroundColor: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.25)', color: '#4ade80', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', marginBottom: '16px' },
  card:    { padding: '16px', border: '1px solid rgba(255,255,255,0.06)', backgroundColor: 'rgba(255,255,255,0.02)', marginBottom: '16px' },
}

const inputStyle = {
  backgroundColor: '#0A0A12', border: '1px solid rgba(255,255,255,0.1)', color: 'white',
  fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', padding: '10px 12px', outline: 'none', width: '100%',
}

/* ── List ───────────────────────────────────────────── */
export function AdminTeamList() {
  const { rows, loading, remove } = useAdminTeam()
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? rows : rows.filter(r => r.section === filter)

  async function handleDelete(item) {
    if (item._source === 'static') {
      alert('This profile is from the default list. Edit and save it first to create a Supabase copy, then you can delete that copy.')
      return
    }
    if (!confirm(`Delete ${item.name}?`)) return
    await remove(item.id)
  }

  return (
    <div style={s.page}>
      <div style={s.topbar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Users size={18} style={{ color: '#C8A96E' }} />
          <h1 style={s.h1}>Team & Advisors</h1>
        </div>
        <Link to="/admin/team/new" style={s.btn}><Plus size={13} /> New Profile</Link>
      </div>

      <p style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', marginBottom: '20px', lineHeight: 1.6 }}>
        Add, edit or remove team members and strategic partners. Changes appear on the About page immediately.
      </p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {['all', 'team', 'advisors'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            ...s.btnGhost,
            backgroundColor: filter === f ? 'rgba(200,169,110,0.12)' : 'transparent',
            color: filter === f ? '#C8A96E' : 'rgba(255,255,255,0.45)',
            borderColor: filter === f ? 'rgba(200,169,110,0.3)' : 'rgba(255,255,255,0.12)',
          }}>
            {f === 'all' ? 'All' : f === 'team' ? 'Management' : 'Advisors'}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Loader size={14} className="animate-spin" /> Loading…
        </div>
      ) : filtered.map(item => (
        <div key={item.id} style={s.row}>
          {item.imageSrc ? (
            <img src={item.imageSrc} alt="" style={s.img} onError={e => e.target.style.display = 'none'} />
          ) : (
            <div style={{ ...s.img, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '0.6rem' }}>—</div>
          )}
          <div style={{ flex: 1 }}>
            <div style={{ color: 'white', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>{item.name}</div>
            <div style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.72rem', fontFamily: 'Inter, sans-serif' }}>
              {item.section === 'advisors' ? 'Advisor' : 'Management'} · {item._source === 'supabase' ? 'Supabase' : 'Default'}
            </div>
          </div>
          <button onClick={() => navigate(`/admin/team/${item.id}`)} style={s.btnGhost}>
            <Pencil size={13} /> Edit
          </button>
          <button onClick={() => handleDelete(item)} style={{ ...s.btnGhost, color: item._source === 'static' ? 'rgba(255,255,255,0.2)' : '#ff6b6b', borderColor: item._source === 'static' ? 'rgba(255,255,255,0.06)' : 'rgba(255,100,100,0.2)' }}>
            <Trash2 size={13} />
          </button>
        </div>
      ))}
    </div>
  )
}

const EMPTY = {
  name: '', email: '', roleEn: '', roleEs: '', bioEn: '', bioEs: '',
  imageSrc: '', section: 'team', sortOrder: '0',
}

function rowToForm(existing) {
  return {
    name:      existing.name || '',
    email:     existing.email || '',
    roleEn:    existing.role?.en || '',
    roleEs:    existing.role?.es || '',
    bioEn:     existing.bio?.en  || '',
    bioEs:     existing.bio?.es  || '',
    imageSrc:  existing.imageSrc || '',
    section:   existing.section || 'team',
    sortOrder: String(existing.sortOrder ?? 0),
  }
}

/* ── Editor ─────────────────────────────────────────── */
export function AdminTeamEditor() {
  const { id }   = useParams()
  const isNew    = id === 'new'
  const navigate = useNavigate()
  const { rows, loading, upsert } = useAdminTeam()
  const fileRef  = useRef(null)

  const [form, setForm]         = useState(EMPTY)
  const [hydrated, setHydrated] = useState(isNew)
  const [saving, setSaving]     = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError]       = useState('')
  const [success, setSuccess]   = useState('')

  useEffect(() => {
    if (!isNew && !hydrated && !loading && rows.length > 0) {
      const existing = rows.find(r => r.id === id)
      if (existing) { setForm(rowToForm(existing)); setHydrated(true) }
    }
  }, [rows, loading, id, isNew, hydrated])

  function set(k, v) { setForm(f => ({ ...f, [k]: v })) }

  async function uploadImage(file) {
    if (!file) return
    setUploading(true)
    const ext  = file.name.split('.').pop()
    const path = `team/${Date.now()}.${ext}`
    const { error: err } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: true })
    if (err) { setError('Upload failed: ' + err.message); setUploading(false); return }
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
    set('imageSrc', data.publicUrl)
    setUploading(false)
  }

  async function save() {
    if (!form.name) { setError('Name is required'); return }
    setSaving(true); setError(''); setSuccess('')
    try {
      await upsert(form, isNew ? undefined : id)
      setSuccess('Profile saved — visible on About page.')
      setTimeout(() => navigate('/admin/team'), 900)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const F = ({ label, field, multiline = false, rows: r = 3 }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <label style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)', fontFamily: '"Space Grotesk", sans-serif' }}>{label}</label>
      {multiline
        ? <textarea value={form[field]} onChange={e => set(field, e.target.value)} rows={r} style={{ ...inputStyle, resize: 'vertical' }} />
        : <input value={form[field]} onChange={e => set(field, e.target.value)} style={inputStyle} />
      }
    </div>
  )

  if (!isNew && loading && !hydrated) {
    return (
      <div style={{ ...s.page, display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.3)' }}>
        <Loader size={16} className="animate-spin" /> Loading profile…
      </div>
    )
  }

  return (
    <div style={s.page}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <Link to="/admin/team" style={{ ...s.btnGhost, padding: '8px 12px' }}><ArrowLeft size={14} /></Link>
        <h1 style={s.h1}>{isNew ? 'New Profile' : 'Edit Profile'}</h1>
      </div>

      {error   && <div style={s.err}>{error}</div>}
      {success && <div style={s.ok}>{success}</div>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={s.card}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <F label="Full Name *" field="name" />
            <F label="Email" field="email" />
            <div>
              <label style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)', fontFamily: '"Space Grotesk", sans-serif' }}>Section</label>
              <select value={form.section} onChange={e => set('section', e.target.value)} style={inputStyle}>
                <option value="team">Management Team</option>
                <option value="advisors">Strategic Partners / Advisors</option>
              </select>
            </div>
            <F label="Sort Order (0 = first)" field="sortOrder" />
            <F label="Role (EN)" field="roleEn" />
            <F label="Role (ES)" field="roleEs" />
          </div>
        </div>

        <div style={s.card}>
          <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', marginBottom: '14px', fontFamily: '"Space Grotesk", sans-serif' }}>Biography</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <F label="Bio (EN)" field="bioEn" multiline rows={8} />
            <F label="Bio (ES)" field="bioEs" multiline rows={8} />
          </div>
        </div>

        <div style={s.card}>
          <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', marginBottom: '14px', fontFamily: '"Space Grotesk", sans-serif' }}>Photo</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px', alignItems: 'start' }}>
            <F label="Image URL" field="imageSrc" />
            <div style={{ paddingTop: '22px' }}>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => uploadImage(e.target.files[0])} />
              <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} style={{ ...s.btnGhost, whiteSpace: 'nowrap' }}>
                {uploading ? <Loader size={13} className="animate-spin" /> : <Upload size={13} />}
                {uploading ? 'Uploading…' : 'Upload Photo'}
              </button>
            </div>
          </div>
          {form.imageSrc && (
            <img src={form.imageSrc} alt="preview" style={{ marginTop: '12px', width: '120px', height: '120px', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} onError={e => e.target.style.display = 'none'} />
          )}
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={save} disabled={saving} style={{ ...s.btn, opacity: saving ? 0.7 : 1 }}>
            {saving ? <Loader size={13} className="animate-spin" /> : <Save size={13} />}
            {saving ? 'Saving…' : 'Save Profile'}
          </button>
          <Link to="/admin/team" style={s.btnGhost}>Cancel</Link>
        </div>
      </div>
    </div>
  )
}
