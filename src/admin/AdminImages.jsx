import { useState, useRef } from 'react'
import { Upload, Copy, Check, Trash2, Loader } from 'lucide-react'
import { supabase } from '../lib/supabase.js'

const BUCKET = 'images'

const s = {
  page:    { padding: '40px 48px', maxWidth: '900px' },
  h1:      { fontWeight: 700, fontSize: '1.3rem', letterSpacing: '0.04em', color: 'white', marginBottom: '6px' },
  sub:     { color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', marginBottom: '36px' },
  drop:    { border: '2px dashed rgba(200,169,110,0.3)', padding: '40px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' },
  sTitle:  { fontWeight: 700, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', marginBottom: '16px', marginTop: '36px' },
  grid:    { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' },
  imgCard: { position: 'relative', backgroundColor: '#0A0A12', border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' },
  urlBar:  { fontSize: '0.65rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', backgroundColor: '#0A0A12', border: '1px solid rgba(255,255,255,0.07)', padding: '8px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', marginTop: '12px' },
  err:     { padding: '10px 16px', backgroundColor: 'rgba(255,100,100,0.1)', border: '1px solid rgba(255,100,100,0.25)', color: '#ff9999', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', marginBottom: '20px' },
}

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }
  return (
    <button onClick={copy} style={{ background: 'none', border: 'none', cursor: 'pointer', color: copied ? '#C8A96E' : 'rgba(255,255,255,0.3)', flexShrink: 0, padding: 0 }}>
      {copied ? <Check size={12} /> : <Copy size={12} />}
    </button>
  )
}

export default function AdminImages() {
  const [files, setFiles]         = useState([])
  const [uploading, setUploading] = useState(false)
  const [error, setError]         = useState('')
  const [isDrag, setIsDrag]       = useState(false)
  const inputRef                  = useRef()

  async function uploadFiles(fileList) {
    setUploading(true); setError('')
    const results = []
    for (const file of fileList) {
      const ext  = file.name.split('.').pop()
      const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
      const { error: err } = await supabase.storage.from(BUCKET).upload(path, file, { cacheControl: '3600', upsert: false })
      if (err) {
        setError(`Error uploading ${file.name}: ${err.message}`)
        continue
      }
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
      results.push({ name: file.name, path, url: data.publicUrl, local: URL.createObjectURL(file) })
    }
    setFiles(prev => [...results, ...prev])
    setUploading(false)
  }

  function handleDrop(e) {
    e.preventDefault(); setIsDrag(false)
    const dropped = [...e.dataTransfer.files].filter(f => f.type.startsWith('image/') || f.type === 'application/pdf')
    if (dropped.length) uploadFiles(dropped)
  }

  function handleInput(e) {
    const selected = [...e.target.files]
    if (selected.length) uploadFiles(selected)
    e.target.value = ''
  }

  async function deleteFile(path, index) {
    if (!confirm('Delete this file from Supabase Storage?')) return
    await supabase.storage.from(BUCKET).remove([path])
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div style={s.page}>
      <h1 style={s.h1}>Media Library</h1>
      <p style={s.sub}>Upload images and files to Supabase Storage. Copy the URL to use it in articles or projects.</p>

      {error && <div style={s.err}>{error}</div>}

      <div
        style={{ ...s.drop, borderColor: isDrag ? '#C8A96E' : 'rgba(200,169,110,0.3)', backgroundColor: isDrag ? 'rgba(200,169,110,0.04)' : 'transparent' }}
        onClick={() => inputRef.current.click()}
        onDragOver={e => { e.preventDefault(); setIsDrag(true) }}
        onDragLeave={() => setIsDrag(false)}
        onDrop={handleDrop}
      >
        <input ref={inputRef} type="file" multiple accept="image/*,application/pdf" style={{ display: 'none' }} onChange={handleInput} />
        {uploading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', color: '#C8A96E' }}>
            <Loader size={24} className="animate-spin" />
            <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Uploading…</span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.3)' }}>
            <Upload size={24} />
            <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Drop files here or click to browse
            </span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)' }}>
              Images (JPG, PNG, WebP) · PDFs
            </span>
          </div>
        )}
      </div>

      {files.length > 0 && (
        <>
          <p style={s.sTitle}>Uploaded this session</p>
          <div style={s.grid}>
            {files.map((f, i) => (
              <div key={i} style={s.imgCard}>
                {f.local.startsWith('blob:') ? (
                  <img src={f.local} alt={f.name} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <div style={{ width: '100%', aspectRatio: '4/3', backgroundColor: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem' }}>PDF</span>
                  </div>
                )}
                <div style={{ padding: '8px' }}>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.68rem', fontFamily: 'Inter, sans-serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                    <button onClick={() => deleteFile(f.path, i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,100,100,0.5)', padding: 0 }}>
                      <Trash2 size={12} />
                    </button>
                    <div style={{ flex: 1, overflow: 'hidden', fontSize: '0.62rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {f.url}
                    </div>
                    <CopyBtn text={f.url} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <p style={s.sTitle}>Usage tip</p>
      <div style={{ backgroundColor: '#0A0A12', border: '1px solid rgba(255,255,255,0.07)', padding: '20px 24px' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
          After uploading, copy the public URL and paste it in the <strong style={{ color: 'rgba(255,255,255,0.6)' }}>Image URL</strong> field of any article or project.
          Files are stored in the <code style={{ color: '#C8A96E', fontSize: '0.75rem' }}>images</code> bucket of your Supabase Storage.
        </p>
      </div>
    </div>
  )
}
