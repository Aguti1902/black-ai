import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://black-ai-iota.vercel.app'
const OG_IMAGE = `${BASE_URL}/images/inteligencia-artificial.jpg`

export default function SEO({ title, description, path = '' }) {
  const fullTitle = title ? `${title} — Black AI` : 'Black AI · AI Infrastructure Platform'
  const desc = description ||
    'Black AI develops, owns and operates next-generation hyperscale data center platforms across Europe and Latin America.'
  const url = `${BASE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type"        content="website" />
      <meta property="og:url"         content={url} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image"       content={OG_IMAGE} />
      <meta property="og:site_name"   content="Black AI" />

      {/* Twitter */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image"       content={OG_IMAGE} />
    </Helmet>
  )
}
