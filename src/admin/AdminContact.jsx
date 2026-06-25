import { useState, useEffect } from 'react'
import { Save, Loader, Mail, Plus, Trash2 } from 'lucide-react'
import { defaultContact } from '../data/siteContact.js'
import { saveSiteContact } from '../hooks/useSiteContact.js'
import { supabase } from '../lib/supabase.js'

const s = {
  page: { padding: '40px 48px', maxWidth: '820px' },
  h1: { fontWeight: 700, fontSize: '1.3rem', letterSpacing: '0.04em', color: 'white', marginBottom: '8px' },
  sub: { color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '28px' },
  btn: { display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', backgroundColor: '#C8A96E', color: '#050508', fontWeight: 700, fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.1em', border: 'none', cursor: 'pointer' },
  btnGhost: { display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 16px', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.55)', fontWeight: 600, fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'none', cursor: 'pointer' },
  card: { padding: '20px', border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.02)', marginBottom: '16px' },
  err: { padding: '10px 16px', backgroundColor: 'rgba(255,100,100,0.1)', border: '1px solid rgba(255,100,100,0.25)', color: '#ff9999', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', marginBottom: '16px' },
  ok:  { padding: '10px 16px', backgroundColor: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.25)', color: '#4ade80', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', marginBottom: '16px' },
}

const inputStyle = {
  backgroundColor: '#0A0A12', border: '1px solid rgba(255,255,255,0.1)', color: 'white',
  fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', padding: '10px 12px', outline: 'none', width: '100%',
}

const EMPTY_OFFICE = {
  id: '', city: '', cityEs: '', countryEn: '', countryEs: '',
  roleEn: '', roleEs: '', addressEn: '', addressEs: '', email: '', phone: '',
}

function F({ label, value, onChange, hint }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', marginBottom: '5px', fontFamily: '"Space Grotesk", sans-serif' }}>
        {label}
      </label>
      <input style={inputStyle} value={value} onChange={e => onChange(e.target.value)} />
      {hint && <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.2)', fontFamily: 'Inter, sans-serif' }}>{hint}</span>}
    </div>
  )
}

export default function AdminContact() {
  const [contact, setContact] = useState(defaultContact)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving]   = useState(false)
  const [error, setError]     = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    supabase.from('site_settings').select('value').eq('key', 'contact_info').maybeSingle()
      .then(({ data }) => {
        if (data?.value) {
          setContact({
            ...defaultContact,
            ...data.value,
            social: { ...defaultContact.social, ...(data.value.social || {}) },
            offices: data.value.offices?.length ? data.value.offices : defaultContact.offices,
          })
        }
        setLoading(false)
      })
  }, [])

  function setField(k, v) {
    setContact(c => ({ ...c, [k]: v }))
  }

  function setSocial(k, v) {
    setContact(c => ({ ...c, social: { ...c.social, [k]: v } }))
  }

  function setOffice(i, k, v) {
    setContact(c => {
      const offices = [...c.offices]
      offices[i] = { ...offices[i], [k]: v }
      return { ...c, offices }
    })
  }

  function addOffice() {
    setContact(c => ({
      ...c,
      offices: [...c.offices, { ...EMPTY_OFFICE, id: `office-${Date.now()}` }],
    }))
  }

  function removeOffice(i) {
    if (!confirm('Remove this office?')) return
    setContact(c => ({ ...c, offices: c.offices.filter((_, idx) => idx !== i) }))
  }

  async function save() {
    setSaving(true); setError(''); setSuccess('')
    try {
      await saveSiteContact(contact)
      setSuccess('Contact info saved — visible on Contact page and Footer immediately.')
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
        <Mail size={18} style={{ color: '#C8A96E' }} />
        <h1 style={s.h1}>Contact & Social</h1>
      </div>
      <p style={s.sub}>
        Edit email, phone, office addresses and social media links. Changes appear on the Contact page and Footer.
      </p>

      {error   && <div style={s.err}>{error}</div>}
      {success && <div style={s.ok}>{success}</div>}

      {/* General */}
      <div style={s.card}>
        <p style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#C8A96E', marginBottom: '14px', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 }}>
          General Contact
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <F label="Main Email" value={contact.generalEmail} onChange={v => setField('generalEmail', v)} />
          <F label="Main Phone (optional)" value={contact.generalPhone} onChange={v => setField('generalPhone', v)} hint="e.g. +34 600 000 000" />
        </div>
      </div>

      {/* Offices */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <p style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#C8A96E', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 }}>
          Offices
        </p>
        <button type="button" onClick={addOffice} style={s.btnGhost}><Plus size={13} /> Add Office</button>
      </div>

      {contact.offices.map((office, i) => (
        <div key={office.id || i} style={s.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 }}>
              Office {i + 1}
            </span>
            {contact.offices.length > 1 && (
              <button type="button" onClick={() => removeOffice(i)} style={{ ...s.btnGhost, color: '#ff6b6b', borderColor: 'rgba(255,100,100,0.2)', padding: '6px 10px' }}>
                <Trash2 size={12} />
              </button>
            )}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <F label="City (EN)" value={office.city} onChange={v => setOffice(i, 'city', v)} />
            <F label="City (ES)" value={office.cityEs} onChange={v => setOffice(i, 'cityEs', v)} />
            <F label="Country (EN)" value={office.countryEn} onChange={v => setOffice(i, 'countryEn', v)} />
            <F label="Country (ES)" value={office.countryEs} onChange={v => setOffice(i, 'countryEs', v)} />
            <F label="Role (EN)" value={office.roleEn} onChange={v => setOffice(i, 'roleEn', v)} />
            <F label="Role (ES)" value={office.roleEs} onChange={v => setOffice(i, 'roleEs', v)} />
            <F label="Address (EN)" value={office.addressEn} onChange={v => setOffice(i, 'addressEn', v)} />
            <F label="Address (ES)" value={office.addressEs} onChange={v => setOffice(i, 'addressEs', v)} />
            <F label="Office Email" value={office.email} onChange={v => setOffice(i, 'email', v)} />
            <F label="Office Phone" value={office.phone} onChange={v => setOffice(i, 'phone', v)} />
          </div>
        </div>
      ))}

      {/* Social */}
      <div style={s.card}>
        <p style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#C8A96E', marginBottom: '14px', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 }}>
          Social Media
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <F label="LinkedIn URL" value={contact.social.linkedin} onChange={v => setSocial('linkedin', v)} hint="Full URL" />
          <F label="X / Twitter URL" value={contact.social.twitter} onChange={v => setSocial('twitter', v)} />
          <F label="Instagram URL" value={contact.social.instagram} onChange={v => setSocial('instagram', v)} />
          <F label="YouTube URL" value={contact.social.youtube} onChange={v => setSocial('youtube', v)} />
        </div>
      </div>

      {/* Footer labels */}
      <div style={s.card}>
        <p style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#C8A96E', marginBottom: '14px', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 }}>
          Footer Location Labels
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <F label="Location 1 (EN)" value={contact.footerLocationEn} onChange={v => setField('footerLocationEn', v)} />
          <F label="Location 1 (ES)" value={contact.footerLocationEs} onChange={v => setField('footerLocationEs', v)} />
          <F label="Location 2 (EN)" value={contact.footerLocation2En} onChange={v => setField('footerLocation2En', v)} />
          <F label="Location 2 (ES)" value={contact.footerLocation2Es} onChange={v => setField('footerLocation2Es', v)} />
        </div>
      </div>

      <button onClick={save} disabled={saving} style={{ ...s.btn, opacity: saving ? 0.7 : 1 }}>
        {saving ? <Loader size={13} className="animate-spin" /> : <Save size={13} />}
        {saving ? 'Saving…' : 'Save Contact Info'}
      </button>
    </div>
  )
}
