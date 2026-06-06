import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
)

/* ── Helpers de transformación ─────────────────────────── */

export function dbNewsToApp(row) {
  return {
    id:       row.id,
    title:    { en: row.title_en,    es: row.title_es    },
    excerpt:  { en: row.excerpt_en,  es: row.excerpt_es  },
    body:     row.body_en ? { en: row.body_en, es: row.body_es } : undefined,
    category: { en: row.category_en, es: row.category_es },
    date:     { en: row.date_en,     es: row.date_es     },
    imageSrc: row.image_url || '/images/inteligencia-artificial.jpg',
    _source:  'supabase',
  }
}

export function appNewsToDb(form, existingId) {
  return {
    id:          existingId || slugify(form.titleEn),
    title_en:    form.titleEn,
    title_es:    form.titleEs    || null,
    excerpt_en:  form.excerptEn  || null,
    excerpt_es:  form.excerptEs  || null,
    body_en:     form.bodyEn     || null,
    body_es:     form.bodyEs     || null,
    category_en: form.categoryEn || 'Project Update',
    category_es: form.categoryEs || null,
    date_en:     form.dateEn     || null,
    date_es:     form.dateEs     || null,
    image_url:   form.imageSrc   || null,
  }
}

export function dbProjectToApp(row) {
  return {
    id:          row.id,
    name:        row.name,
    region:      row.region,
    capacity:    row.capacity,
    tags:        row.tags || [],
    location:    { en: row.location_en,    es: row.location_es    },
    status:      { en: row.status_en,      es: row.status_es      },
    tagline:     { en: row.tagline_en,     es: row.tagline_es     },
    description: { en: row.description_en, es: row.description_es },
    highlights:  { en: row.highlights_en  || [], es: row.highlights_es || [] },
    specs:       row.specs || [],
    imageSrc:    row.image_url || '/images/inteligencia-artificial.jpg',
    pdfSrc:      row.pdf_url  || '',
    _source:     'supabase',
  }
}

export function appProjectToDb(form, existingId) {
  return {
    id:             existingId || slugify(form.name),
    name:           form.name,
    region:         form.region        || 'Europe',
    capacity:       form.capacity      || '',
    tags:           form.tags.split(',').map(t => t.trim()).filter(Boolean),
    location_en:    form.locationEn    || null,
    location_es:    form.locationEs    || null,
    status_en:      form.statusEn      || 'Development Phase',
    status_es:      form.statusEs      || null,
    tagline_en:     form.taglineEn     || null,
    tagline_es:     form.taglineEs     || null,
    description_en: form.descEn        || null,
    description_es: form.descEs        || null,
    highlights_en:  form.highlightsEn.split('\n').filter(Boolean),
    highlights_es:  form.highlightsEs.split('\n').filter(Boolean),
    specs:          form.specs         || [],
    image_url:      form.imageSrc      || null,
    pdf_url:        form.pdfSrc        || null,
  }
}

function slugify(s = '') {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || Date.now().toString()
}
