export const defaultContact = {
  generalEmail: 'info@blackai.com',
  generalPhone: '',
  offices: [
    {
      id: 'sevilla',
      city: 'Sevilla',
      cityEs: 'Sevilla',
      countryEn: 'Spain',
      countryEs: 'España',
      roleEn: 'European Headquarters',
      roleEs: 'Sede Europea',
      addressEn: 'Avenida de la Constitución 36, 2nd Floor',
      addressEs: 'Avenida de la Constitución 36, 2ª Planta',
      email: 'info@blackai.com',
      phone: '',
    },
    {
      id: 'panama',
      city: 'Panama City',
      cityEs: 'Ciudad de Panamá',
      countryEn: 'Panama',
      countryEs: 'Panamá',
      roleEn: 'Americas Office',
      roleEs: 'Oficina para las Américas',
      addressEn: 'Torre Inteligente Credicorp Bank, Calle 50, Office 3101, Floor 31, Panama City, Republic of Panama',
      addressEs: 'Torre Inteligente Credicorp Bank, Calle 50, Oficina 3101, Piso 31, Ciudad de Panamá, República de Panamá',
      email: 'info@blackai.com',
      phone: '',
    },
  ],
  social: {
    linkedin: '',
    twitter: '',
    instagram: '',
    youtube: '',
  },
  footerLocationEn: 'Sevilla, Spain',
  footerLocationEs: 'Sevilla, España',
  footerLocation2En: 'Panama City, Panama',
  footerLocation2Es: 'Ciudad de Panamá, Panamá',
}

export function resolveOffices(contact, lang) {
  return (contact?.offices || []).map(o => ({
    id: o.id,
    role: lang === 'es' ? o.roleEs : o.roleEn,
    city: lang === 'es' ? (o.cityEs || o.city) : o.city,
    country: lang === 'es' ? o.countryEs : o.countryEn,
    address: lang === 'es' ? o.addressEs : o.addressEn,
    email: o.email || contact.generalEmail,
    phone: o.phone || '',
  }))
}

export function resolveSocialLinks(contact) {
  const s = contact?.social || {}
  return [
    { key: 'linkedin',  label: 'LinkedIn',  url: s.linkedin },
    { key: 'twitter',   label: 'X / Twitter', url: s.twitter },
    { key: 'instagram', label: 'Instagram', url: s.instagram },
    { key: 'youtube',   label: 'YouTube',   url: s.youtube },
  ].filter(l => l.url && l.url.trim())
}
