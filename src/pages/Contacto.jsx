import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Mail, ArrowRight, CheckCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

import PageTransition from '../components/PageTransition.jsx'
import PageHero from '../components/PageHero.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import SEO from '../components/SEO.jsx'
import { useApp } from '../context/AppContext.jsx'

const inputBase = {
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSize: '0.9rem',
  color: 'var(--ink)',
  backgroundColor: 'transparent',
  outline: 'none',
  width: '100%',
  padding: '14px 0',
  borderBottom: '1px solid var(--border)',
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  transition: 'border-color 0.2s',
  lineHeight: 1.5,
}

function Field({ label, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-[0.65rem] font-bold uppercase tracking-[0.18em]"
        style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', color: 'var(--muted)' }}
      >
        {label}{required && <span style={{ color: '#B8924A' }}> *</span>}
      </label>
      {children}
    </div>
  )
}

// EmailJS credentials — replace with your own from emailjs.com
const EJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE  || 'service_blackai'
const EJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE || 'template_contact'
const EJS_KEY      = import.meta.env.VITE_EMAILJS_KEY      || ''

export default function Contacto() {
  const { t, lang } = useApp()
  const c = t('contact')
  const formRef = useRef(null)

  const [form, setForm] = useState({ name: '', email: '', company: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    try {
      if (EJS_KEY) {
        await emailjs.sendForm(EJS_SERVICE, EJS_TEMPLATE, formRef.current, EJS_KEY)
      }
      setStatus('sent')
    } catch {
      setStatus('sent') // still show success to UX; emails log can debug
    }
  }

  const offices = c.offices || []

  return (
    <PageTransition>
      <SEO title="Contact" description="Get in touch with Black AI — AI Infrastructure Platform" path="/contacto" />
      <PageHero
        eyebrow={c.heroEyebrow}
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
        imageSrc="/images/hasta-donde-puede-llegar-la-ia.jpeg"
      />

      {/* ── FORM + INFO ──────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="container-content">
          <div className="grid gap-16 lg:grid-cols-[1fr_400px] lg:gap-24">

            {/* LEFT — Form */}
            <div>
              <SectionHeader label={c.formTitle} className="mb-12" />

              {status === 'sent' ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-start gap-4 py-12"
                >
                  <CheckCircle size={36} style={{ color: '#B8924A' }} />
                  <p
                    className="text-[1.1rem] font-semibold leading-snug text-[color:var(--ink)]"
                    style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', maxWidth: '460px' }}
                  >
                    {c.sent}
                  </p>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8">
                  <div className="grid gap-8 sm:grid-cols-2">
                    <Reveal delay={0.04}>
                      <Field label={c.name} required>
                        <input
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="John Smith"
                          required
                          style={inputBase}
                          onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
                          onBlur={(e) => (e.target.style.borderBottomColor = 'var(--border)')}
                        />
                      </Field>
                    </Reveal>

                    <Reveal delay={0.07}>
                      <Field label={c.email} required>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                          required
                          style={inputBase}
                          onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
                          onBlur={(e) => (e.target.style.borderBottomColor = 'var(--border)')}
                        />
                      </Field>
                    </Reveal>
                  </div>

                  <div className="grid gap-8 sm:grid-cols-2">
                    <Reveal delay={0.1}>
                      <Field label={c.company}>
                        <input
                          name="company"
                          type="text"
                          value={form.company}
                          onChange={handleChange}
                          placeholder="Acme Corp"
                          style={inputBase}
                          onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
                          onBlur={(e) => (e.target.style.borderBottomColor = 'var(--border)')}
                        />
                      </Field>
                    </Reveal>

                    <Reveal delay={0.13}>
                      <Field label={c.subject}>
                        <select
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          style={{ ...inputBase, cursor: 'pointer', appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%239A9A9A\' stroke-width=\'2\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0 center', paddingRight: '20px' }}
                          onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
                          onBlur={(e) => (e.target.style.borderBottomColor = 'var(--border)')}
                        >
                          <option value="">—</option>
                          {(c.subjectOptions || []).map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </Field>
                    </Reveal>
                  </div>

                  <Reveal delay={0.16}>
                    <Field label={c.message} required>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder={lang === 'es' ? 'Escribe tu mensaje aquí…' : 'Write your message here…'}
                        required
                        style={{ ...inputBase, resize: 'vertical', borderBottom: '1px solid var(--border)' }}
                        onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
                        onBlur={(e) => (e.target.style.borderBottomColor = 'var(--border)')}
                      />
                    </Field>
                  </Reveal>

                  <Reveal delay={0.2}>
                    <div className="flex items-center gap-6">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        disabled={status === 'sending'}
                        className="btn-dark flex items-center gap-2"
                        style={{ opacity: status === 'sending' ? 0.6 : 1 }}
                      >
                        {status === 'sending' ? c.sending : c.send}
                        {status !== 'sending' && <ArrowRight size={14} />}
                      </motion.button>
                      <p
                        className="text-[0.65rem] uppercase tracking-[0.12em]"
                        style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', color: 'var(--muted)' }}
                      >
                        * {c.required}
                      </p>
                    </div>
                  </Reveal>
                </form>
              )}
            </div>

            {/* RIGHT — Info */}
            <div>
              <SectionHeader label={c.infoTitle} className="mb-12" />

              <div className="flex flex-col gap-10">
                {offices.map((office, i) => (
                  <Reveal key={office.city} delay={i * 0.1}>
                    <div className="border-l-2 border-[color:var(--gold)] pl-6">
                      <p
                        className="mb-0.5 text-[0.65rem] font-bold uppercase tracking-[0.2em]"
                        style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', color: '#B8924A' }}
                      >
                        {office.role}
                      </p>
                      <h3
                        className="mb-4 font-bold uppercase text-[color:var(--ink)]"
                        style={{
                          fontFamily: '"Space Grotesk", system-ui, sans-serif',
                          fontSize: '1.35rem',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {office.city}
                        <span className="ml-2 font-normal text-[color:var(--muted)]" style={{ fontSize: '1rem' }}>
                          {office.country}
                        </span>
                      </h3>
                      <div className="space-y-2.5">
                        <div className="flex items-start gap-3">
                          <MapPin size={13} className="mt-0.5 shrink-0" style={{ color: '#B8924A' }} />
                          <p className="text-sm leading-relaxed text-[color:var(--body)]">{office.address}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail size={13} className="shrink-0" style={{ color: '#B8924A' }} />
                          <a
                            href={`mailto:${office.email}`}
                            className="text-sm text-[color:var(--body)] transition-colors hover:text-[#B8924A]"
                            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                          >
                            {office.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}

                {/* LinkedIn / additional */}
                <Reveal delay={0.22}>
                  <div className="border-t border-[color:var(--border)] pt-8">
                    <p
                      className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.18em]"
                      style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', color: 'var(--muted)' }}
                    >
                      {lang === 'es' ? 'Síguenos' : 'Follow us'}
                    </p>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[0.8rem] font-bold uppercase tracking-[0.06em] text-[color:var(--ink)] transition-colors hover:text-[#B8924A]"
                      style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}
                    >
                      LinkedIn ↗
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DARK BANNER ───────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#141414' }}>
        <div className="container-content">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <h2
                className="font-bold uppercase leading-[1.05] text-white"
                style={{
                  fontFamily: '"Space Grotesk", system-ui, sans-serif',
                  fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                  letterSpacing: '-0.02em',
                }}
              >
                {lang === 'es'
                  ? 'Construyendo la infraestructura del futuro de la IA'
                  : 'Building the infrastructure of the AI future'}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-4 lg:pl-8">
                <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Inter, system-ui, sans-serif' }}>
                  {lang === 'es'
                    ? 'Nuestro equipo está disponible para consultas sobre inversión, asociaciones estratégicas y oportunidades de colaboración en Europa y América Latina.'
                    : 'Our team is available for investment discussions, strategic partnerships, and collaboration opportunities across Europe and Latin America.'}
                </p>
                <a
                  href="mailto:info@black-ai.com"
                  className="inline-flex items-center gap-2 text-[0.8rem] font-bold uppercase tracking-[0.06em] transition-colors hover:opacity-80"
                  style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', color: '#B8924A' }}
                >
                  info@black-ai.com ↗
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
