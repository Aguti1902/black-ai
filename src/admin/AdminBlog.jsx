import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Pencil, Trash2, Plus, ArrowLeft, ArrowRight, Save, Loader, Upload, Eye, Images, X } from 'lucide-react'
import { useAdminNews } from './useAdminData.js'
import { supabase, normalizeGallery } from '../lib/supabase.js'

const BUCKET = 'images'

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
const EMPTY = { titleEn:'', titleEs:'', excerptEn:'', excerptEs:'', bodyEn:'', bodyEs:'', categoryEn:'', categoryEs:'', dateEn:'', dateEs:'', imageSrc:'', gallery:[] }

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
    gallery:    normalizeGallery(existing.gallery),
  }
}

const inputStyle = { backgroundColor: '#0A0A12', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', padding: '10px 12px', outline: 'none', resize: 'vertical', borderRadius: 0, width: '100%' }
const labelStyle = { fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)', fontFamily: '"Space Grotesk", sans-serif' }
const cardStyle  = { padding: '16px', border: '1px solid rgba(255,255,255,0.06)', backgroundColor: 'rgba(255,255,255,0.02)' }
const cardTitle  = { fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', marginBottom: '14px', fontFamily: '"Space Grotesk", sans-serif' }

/* Declared outside the editor so typing does not remount the input (focus loss). */
function Field({ label, value, onChange, multiline = false, rows = 3, hint }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <label style={labelStyle}>{label}</label>
      {multiline
        ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} style={inputStyle} />
        : <input    value={value} onChange={e => onChange(e.target.value)} style={inputStyle} />
      }
      {hint && <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.22)', fontFamily: 'Inter, sans-serif' }}>{hint}</span>}
    </div>
  )
}

const thumbBtn = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, border: '1px solid rgba(255,255,255,0.14)', backgroundColor: 'rgba(5,5,8,0.85)', color: 'rgba(255,255,255,0.65)', cursor: 'pointer', padding: 0 }

function GalleryEditor({ gallery, onChange, onError }) {
  const fileRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [isDrag, setIsDrag]       = useState(false)
  const [urlDraft, setUrlDraft]   = useState('')

  async function uploadFiles(fileList) {
    const files = [...(fileList || [])].filter(f => f.type.startsWith('image/'))
    if (!files.length) return
    setUploading(true)
    const uploaded = []
    for (const file of files) {
      const ext  = file.name.split('.').pop()
      const path = `blog/gallery/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
      const { error: err } = await supabase.storage.from(BUCKET).upload(path, file, { cacheControl: '3600', upsert: true })
      if (err) { onError(`No se pudo subir ${file.name}: ${err.message}`); continue }
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
      uploaded.push(data.publicUrl)
    }
    if (uploaded.length) onChange([...gallery, ...uploaded])
    setUploading(false)
  }

  function move(index, delta) {
    const target = index + delta
    if (target < 0 || target >= gallery.length) return
    const next = [...gallery]
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(next)
  }

  function remove(index) {
    onChange(gallery.filter((_, i) => i !== index))
  }

  function addUrl() {
    const url = urlDraft.trim()
    if (!url) return
    onChange([...gallery, url])
    setUrlDraft('')
  }

  return (
    <div style={cardStyle}>
      <p style={{ ...cardTitle, marginBottom: '4px' }}>Image Gallery · Galería de imágenes</p>
      <p style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.2)', marginBottom: '14px', fontFamily: 'Inter, sans-serif' }}>
        Extra photos shown below the article body. Drag files in or upload several at once, reorder with the arrows, remove with ✕.
      </p>

      <div
        onClick={() => fileRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setIsDrag(true) }}
        onDragLeave={() => setIsDrag(false)}
        onDrop={e => { e.preventDefault(); setIsDrag(false); uploadFiles(e.dataTransfer.files) }}
        style={{
          border: `2px dashed ${isDrag ? '#C8A96E' : 'rgba(200,169,110,0.3)'}`,
          backgroundColor: isDrag ? 'rgba(200,169,110,0.04)' : 'transparent',
          padding: '26px', textAlign: 'center', cursor: 'pointer',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          color: uploading ? '#C8A96E' : 'rgba(255,255,255,0.3)',
        }}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={e => { uploadFiles(e.target.files); e.target.value = '' }}
        />
        {uploading ? <Loader size={20} className="animate-spin" /> : <Images size={20} />}
        <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          {uploading ? 'Subiendo…' : 'Arrastra fotos aquí o haz clic para elegir'}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
        <input
          value={urlDraft}
          onChange={e => setUrlDraft(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addUrl() } }}
          placeholder="…or paste an image URL"
          style={{ ...inputStyle, flex: 1 }}
        />
        <button onClick={addUrl} disabled={!urlDraft.trim()} style={{ ...s.btnGhost, whiteSpace: 'nowrap', opacity: urlDraft.trim() ? 1 : 0.4 }}>
          <Plus size={13} /> Add
        </button>
      </div>

      {gallery.length > 0 && (
        <>
          <p style={{ ...labelStyle, marginTop: '18px', display: 'block' }}>{gallery.length} photo{gallery.length === 1 ? '' : 's'}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px', marginTop: '10px' }}>
            {gallery.map((url, i) => (
              <div key={`${url}-${i}`} style={{ position: 'relative', border: '1px solid rgba(255,255,255,0.08)', backgroundColor: '#0A0A12' }}>
                <img
                  src={url}
                  alt=""
                  style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', display: 'block' }}
                  onError={e => { e.target.style.opacity = '0.15' }}
                />
                <span style={{ position: 'absolute', top: 6, left: 6, backgroundColor: 'rgba(5,5,8,0.85)', color: '#C8A96E', fontSize: '0.6rem', fontWeight: 700, padding: '2px 6px', fontFamily: 'monospace' }}>
                  {i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  title="Eliminar"
                  style={{ ...thumbBtn, position: 'absolute', top: 6, right: 6, color: '#ff6b6b', borderColor: 'rgba(255,100,100,0.3)' }}
                >
                  <X size={13} />
                </button>
                <div style={{ display: 'flex', gap: '6px', padding: '6px' }}>
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} title="Mover antes" style={{ ...thumbBtn, opacity: i === 0 ? 0.3 : 1 }}>
                    <ArrowLeft size={13} />
                  </button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === gallery.length - 1} title="Mover después" style={{ ...thumbBtn, opacity: i === gallery.length - 1 ? 0.3 : 1 }}>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export function AdminBlogEditor() {
  const { id }   = useParams()
  const isNew    = id === 'new'
  const navigate = useNavigate()
  const { rows, loading, upsert } = useAdminNews()
  const fileRef  = useRef(null)

  const [form, setForm]         = useState(EMPTY)
  const [hydrated, setHydrated] = useState(false)
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
    const path = `blog/${Date.now()}.${ext}`
    const { error: err } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: true })
    if (err) { setError('Image upload failed: ' + err.message); setUploading(false); return }
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
    set('imageSrc', data.publicUrl)
    setUploading(false)
  }

  async function save() {
    if (!form.titleEn) { setError('Title (EN) is required'); return }
    setSaving(true); setError(''); setSuccess('')
    try {
      await upsert(form, isNew ? undefined : id)
      setSuccess('Article saved successfully!')
      setTimeout(() => navigate('/admin/blog'), 900)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

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
        {!isNew && (
          <a href={`/noticias/${id}`} target="_blank" rel="noopener" style={{ ...s.btnGhost, marginLeft: 'auto', textDecoration: 'none' }}>
            <Eye size={13} /> Preview
          </a>
        )}
      </div>

      {error   && <div style={s.err}>{error}</div>}
      {success && <div style={{ ...s.err, backgroundColor: 'rgba(74,222,128,0.1)', borderColor: 'rgba(74,222,128,0.25)', color: '#4ade80' }}>{success}</div>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Titles */}
        <div style={cardStyle}>
          <p style={cardTitle}>Titles &amp; Categories</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <Field label="Title (EN) *"  value={form.titleEn}    onChange={v => set('titleEn', v)} />
            <Field label="Title (ES)"    value={form.titleEs}    onChange={v => set('titleEs', v)} />
            <Field label="Category (EN)" value={form.categoryEn} onChange={v => set('categoryEn', v)} hint="e.g. Project Update" />
            <Field label="Category (ES)" value={form.categoryEs} onChange={v => set('categoryEs', v)} hint="e.g. Actualización de Proyecto" />
            <Field label="Date (EN)"     value={form.dateEn}     onChange={v => set('dateEn', v)} hint="e.g. June 2026" />
            <Field label="Date (ES)"     value={form.dateEs}     onChange={v => set('dateEs', v)} hint="e.g. Junio 2026" />
          </div>
        </div>

        {/* Excerpts */}
        <div style={cardStyle}>
          <p style={cardTitle}>Excerpt (shown in card &amp; article lead)</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <Field label="Excerpt (EN)" value={form.excerptEn} onChange={v => set('excerptEn', v)} multiline rows={3} />
            <Field label="Excerpt (ES)" value={form.excerptEs} onChange={v => set('excerptEs', v)} multiline rows={3} />
          </div>
        </div>

        {/* Body */}
        <div style={cardStyle}>
          <p style={{ ...cardTitle, marginBottom: '4px' }}>Article Body</p>
          <p style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.2)', marginBottom: '14px', fontFamily: 'Inter, sans-serif' }}>Separate paragraphs with a blank line (double Enter).</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <Field label="Body (EN)" value={form.bodyEn} onChange={v => set('bodyEn', v)} multiline rows={10} />
            <Field label="Body (ES)" value={form.bodyEs} onChange={v => set('bodyEs', v)} multiline rows={10} />
          </div>
        </div>

        {/* Image */}
        <div style={cardStyle}>
          <p style={cardTitle}>Cover Image</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px', alignItems: 'start' }}>
            <Field label="Image URL" value={form.imageSrc} onChange={v => set('imageSrc', v)} hint="Paste a URL or upload a file →" />
            <div style={{ paddingTop: '22px' }}>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => uploadImage(e.target.files[0])} />
              <button onClick={() => fileRef.current?.click()} disabled={uploading} style={{ ...s.btnGhost, whiteSpace: 'nowrap' }}>
                {uploading ? <Loader size={13} className="animate-spin" /> : <Upload size={13} />}
                {uploading ? 'Uploading…' : 'Upload'}
              </button>
            </div>
          </div>
          {form.imageSrc && (
            <div style={{ marginTop: '12px' }}>
              <img src={form.imageSrc} alt="preview" style={{ maxHeight: '140px', maxWidth: '100%', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} onError={e => e.target.style.display='none'} />
            </div>
          )}
        </div>

        {/* Gallery */}
        <GalleryEditor
          gallery={form.gallery}
          onChange={next => set('gallery', next)}
          onError={setError}
        />

        <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
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
