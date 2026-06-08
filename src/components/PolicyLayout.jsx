import { motion } from 'framer-motion'
import PageTransition from './PageTransition.jsx'

export default function PolicyLayout({ eyebrow, title, lastUpdated, children }) {
  return (
    <PageTransition>
      {/* Hero */}
      <section style={{ backgroundColor: 'var(--dark, #141414)', paddingTop: '120px', paddingBottom: '72px' }}>
        <div className="container-content">
          <span style={{
            display: 'block', marginBottom: '16px',
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: '0.62rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.35)',
          }}>
            {eyebrow}
          </span>
          <h1 style={{
            fontFamily: '"Space Grotesk", system-ui, sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '-0.02em', lineHeight: 1.1,
            color: 'white',
          }}>
            {title}
          </h1>
          {lastUpdated && (
            <p style={{
              marginTop: '16px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8rem',
              color: 'rgba(255,255,255,0.3)',
            }}>
              {lastUpdated}
            </p>
          )}
        </div>
      </section>

      {/* Body */}
      <section style={{ backgroundColor: 'var(--bg)', paddingTop: '72px', paddingBottom: '100px' }}>
        <div className="container-content">
          <div style={{ maxWidth: '760px' }} className="policy-body">
            {children}
          </div>
        </div>
      </section>

      <style>{`
        .policy-body h2 {
          font-family: "Space Grotesk", system-ui, sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--ink);
          margin-top: 3rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--border);
        }
        .policy-body p {
          font-family: Inter, system-ui, sans-serif;
          font-size: 0.92rem;
          line-height: 1.8;
          color: var(--body);
          margin-bottom: 1.1rem;
        }
        .policy-body ul {
          padding-left: 1.4rem;
          margin-bottom: 1.1rem;
        }
        .policy-body li {
          font-family: Inter, system-ui, sans-serif;
          font-size: 0.92rem;
          line-height: 1.8;
          color: var(--body);
          margin-bottom: 0.4rem;
          list-style: disc;
        }
        .policy-body a {
          color: var(--gold, #B8924A);
          text-decoration: underline;
        }
        .policy-body strong {
          color: var(--ink);
          font-weight: 600;
        }
        .policy-body table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1.5rem;
          font-size: 0.85rem;
        }
        .policy-body th {
          text-align: left;
          padding: 10px 14px;
          background: var(--bg-2);
          border: 1px solid var(--border);
          font-family: "Space Grotesk", sans-serif;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--ink);
          font-weight: 700;
        }
        .policy-body td {
          padding: 10px 14px;
          border: 1px solid var(--border);
          color: var(--body);
          font-family: Inter, sans-serif;
          vertical-align: top;
        }
      `}</style>
    </PageTransition>
  )
}
