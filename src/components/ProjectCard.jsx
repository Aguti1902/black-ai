import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PdfCover from './PdfCover.jsx'
import { useApp } from '../context/AppContext.jsx'

export default function ProjectCard({ project, index = 0 }) {
  const { t, L } = useApp()

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden border border-[color:var(--border)]"
    >
      {/* PDF cover — fixed height so all cards are uniform */}
      <div style={{ overflow: 'hidden', maxHeight: '260px' }}>
        <PdfCover src={project.pdfSrc} alt={project.name} />
      </div>

      {/* Info below image */}
      <div className="flex flex-1 flex-col justify-between bg-[color:var(--surface)] p-5">
        <div>
          <span
            className="mb-1 block text-[0.58rem] uppercase tracking-[0.22em] text-[color:var(--muted)]"
            style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}
          >
            {project.region}
          </span>
          <h3
            className="text-[1.05rem] font-bold uppercase leading-tight text-[color:var(--ink)]"
            style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', letterSpacing: '-0.01em' }}
          >
            {project.name}
          </h3>
          <p
            className="mt-1 text-[0.6rem] uppercase tracking-[0.15em] text-[color:var(--muted)]"
            style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}
          >
            {L(project.location)}
          </p>
          <p
            className="mt-2 text-[0.85rem] font-bold uppercase text-[color:var(--gold)]"
            style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}
          >
            {project.capacity}
          </p>
        </div>

        <Link
          to="/proyectos"
          className="mt-4 inline-flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-[color:var(--body)] transition-colors hover:text-[color:var(--gold)]"
          style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}
        >
          {t('common.viewProject')} ↗
        </Link>
      </div>
    </motion.div>
  )
}
