import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

export default function PdfCover({ src, alt = '', className = '', style = {} }) {
  const [width, setWidth] = useState(null)

  return (
    <div
      ref={(el) => { if (el && !width) setWidth(el.clientWidth) }}
      className={className}
      style={{ overflow: 'hidden', width: '100%', ...style }}
    >
      {width && (
        <Document
          file={src}
          loading={
            <div
              style={{
                width: '100%',
                aspectRatio: '4/3',
                background: '#1A1A1A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: '#B8924A', fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.7rem', letterSpacing: '0.3em' }}>
                LOADING…
              </span>
            </div>
          }
          error={
            <div
              style={{
                width: '100%',
                aspectRatio: '4/3',
                background: '#1A1A1A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: '#B8924A', fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.7rem', letterSpacing: '0.3em' }}>
                {alt}
              </span>
            </div>
          }
        >
          <Page
            pageNumber={1}
            width={width}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        </Document>
      )}
    </div>
  )
}
