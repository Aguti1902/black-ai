// Localized content. Translatable fields are { en, es } objects resolved at
// render time via the L() helper from AppContext. Non-text fields (id,
// capacity, region, image, tags) are shared across languages.

export const projects = [
  {
    id: 'malpica',
    name: 'DC Malpica AI',
    region: 'Europe',
    capacity: '300 MW',
    mapLng: -8.82,
    mapLat: 43.33,
    image: 'https://picsum.photos/seed/malpica/1200/900',
    imageSrc: '/images/inteligencia-artificial.jpg',
    pdfSrc: '/projects/dc-malpica-ai.pdf',
    tags: ['AI', 'HPC', 'Hyperscale', 'Spain'],
    location: { en: 'Toledo, Spain', es: 'Toledo, España' },
    status: { en: 'Development Phase', es: 'Fase de Desarrollo' },
    tagline: {
      en: 'AI Infrastructure Campus in Central Spain',
      es: 'Campus de Infraestructura de IA en el Centro de España',
    },
    description: {
      en: 'A hyperscale AI infrastructure campus in central Spain, engineered for high-density compute and long-term energy security in the heart of the Iberian grid.',
      es: 'Un campus de infraestructura de IA a hiperescala en el centro de España, diseñado para cómputo de alta densidad y seguridad energética a largo plazo en el corazón de la red ibérica.',
    },
    highlights: {
      en: [
        'Strategically positioned within the central Spanish energy grid',
        'Designed for ultra-high-density AI and HPC workloads',
        'Direct access to renewable energy generation corridors',
        'Carrier-neutral fiber connectivity to major European hubs',
      ],
      es: [
        'Posicionado estratégicamente dentro de la red energética del centro de España',
        'Diseñado para cargas de IA y HPC de altísima densidad',
        'Acceso directo a corredores de generación de energía renovable',
        'Conectividad de fibra neutral de operador hacia los principales hubs europeos',
      ],
    },
    specs: [
      {
        label: { en: 'Asset Type', es: 'Tipo de Activo' },
        value: { en: 'Hyperscale AI Campus', es: 'Campus de IA Hiperescala' },
      },
      {
        label: { en: 'Capacity', es: 'Capacidad' },
        value: { en: '300 MW IT', es: '300 MW IT' },
      },
      {
        label: { en: 'Investment', es: 'Inversión' },
        value: { en: '€3 Billion', es: '€3 mil millones' },
      },
      {
        label: { en: 'Target Users', es: 'Usuarios Objetivo' },
        value: {
          en: 'AI / HPC Hyperscalers',
          es: 'Hiperescaladores IA / HPC',
        },
      },
      {
        label: { en: 'Energy Strategy', es: 'Estrategia Energética' },
        value: {
          en: 'Renewable-led, grid-secured',
          es: 'Liderada por renovables, asegurada por red',
        },
      },
      {
        label: { en: 'Connectivity', es: 'Conectividad' },
        value: { en: 'Carrier-neutral fiber', es: 'Fibra neutral de operador' },
      },
    ],
  },
  {
    id: 'cordoba',
    name: 'DC Córdoba AI',
    region: 'Europe',
    capacity: '300 MW',
    mapLng: -4.78,
    mapLat: 37.88,
    image: 'https://picsum.photos/seed/cordoba/1200/900',
    imageSrc: '/images/ia-672c582740ea40627fefbe0cb4692b2b2063d71d.jpg',
    pdfSrc: '/projects/dc-cordoba-ai.pdf',
    tags: ['AI', 'HPC', 'Hyperscale', 'Spain'],
    location: { en: 'Córdoba, Spain', es: 'Córdoba, España' },
    status: { en: 'Development Phase', es: 'Fase de Desarrollo' },
    tagline: {
      en: 'AI Infrastructure Campus in Southern Spain',
      es: 'Campus de Infraestructura de IA en el Sur de España',
    },
    description: {
      en: 'A southern Spanish AI campus leveraging abundant solar generation and strategic connectivity to position Andalusia as a node in the European AI compute map.',
      es: 'Un campus de IA en el sur de España que aprovecha la abundante generación solar y una conectividad estratégica para posicionar a Andalucía como nodo en el mapa europeo de cómputo de IA.',
    },
    highlights: {
      en: [
        'Located in a region with exceptional solar resource availability',
        'Scalable footprint for future AI workload expansion',
        'Engineered to institutional-grade reliability standards',
        'Long-term power purchase strategy securing energy supply',
      ],
      es: [
        'Ubicado en una región con una disponibilidad de recurso solar excepcional',
        'Huella escalable para la futura expansión de cargas de IA',
        'Diseñado conforme a estándares de fiabilidad de grado institucional',
        'Estrategia de compra de energía a largo plazo que asegura el suministro',
      ],
    },
    specs: [
      {
        label: { en: 'Asset Type', es: 'Tipo de Activo' },
        value: { en: 'Hyperscale AI Campus', es: 'Campus de IA Hiperescala' },
      },
      {
        label: { en: 'Capacity', es: 'Capacidad' },
        value: { en: '300 MW IT', es: '300 MW IT' },
      },
      {
        label: { en: 'Investment', es: 'Inversión' },
        value: { en: '€3 Billion', es: '€3 mil millones' },
      },
      {
        label: { en: 'Target Users', es: 'Usuarios Objetivo' },
        value: {
          en: 'AI / HPC Hyperscalers',
          es: 'Hiperescaladores IA / HPC',
        },
      },
      {
        label: { en: 'Energy Strategy', es: 'Estrategia Energética' },
        value: {
          en: 'Solar-led, long-term PPA',
          es: 'Liderada por solar, PPA a largo plazo',
        },
      },
      {
        label: { en: 'Connectivity', es: 'Conectividad' },
        value: { en: 'Strategic fiber routes', es: 'Rutas estratégicas de fibra' },
      },
    ],
  },
  {
    id: 'santa-maria',
    name: 'DC Santa María de la Antigua AI',
    region: 'LatAm',
    capacity: '1.2 GW',
    mapLng: -79.52,
    mapLat: 8.99,
    image: 'https://picsum.photos/seed/santamaria/1200/900',
    imageSrc: '/images/image.jpg',
    pdfSrc: '/projects/dc-santa-maria-ai.pdf',
    tags: ['AI', 'HPC', 'Hyperscale', 'Panama'],
    location: { en: 'Panama City, Panama', es: 'Ciudad de Panamá, Panamá' },
    status: { en: 'Development Phase', es: 'Fase de Desarrollo' },
    tagline: {
      en: 'Flagship AI campus in the Americas',
      es: 'Campus insignia de IA en las Américas',
    },
    description: {
      en: 'Black AI’s flagship development in the Americas — a gigawatt-scale AI campus positioned at the crossroads of global subsea connectivity in Panama City.',
      es: 'El desarrollo insignia de Black AI en las Américas: un campus de IA a escala de gigavatios situado en el cruce de la conectividad submarina global en Ciudad de Panamá.',
    },
    highlights: {
      en: [
        'Gigawatt-scale flagship platform for the Americas',
        'Direct proximity to multiple subsea cable landing points',
        'Designed as a primary node for hemispheric AI compute',
        'Phased delivery enabling rapid hyperscale absorption',
      ],
      es: [
        'Plataforma insignia a escala de gigavatios para las Américas',
        'Proximidad directa a múltiples puntos de amarre de cables submarinos',
        'Diseñado como nodo principal de cómputo de IA hemisférico',
        'Entrega por fases que permite una rápida absorción a hiperescala',
      ],
    },
    specs: [
      {
        label: { en: 'Asset Type', es: 'Tipo de Activo' },
        value: {
          en: 'Flagship Hyperscale AI Campus',
          es: 'Campus Insignia de IA Hiperescala',
        },
      },
      {
        label: { en: 'Capacity', es: 'Capacidad' },
        value: { en: '1.2 GW IT', es: '1.2 GW IT' },
      },
      {
        label: { en: 'Investment', es: 'Inversión' },
        value: { en: 'US$12 Billion', es: 'US$12 mil millones' },
      },
      {
        label: { en: 'Target Users', es: 'Usuarios Objetivo' },
        value: {
          en: 'Global AI Hyperscalers',
          es: 'Hiperescaladores Globales de IA',
        },
      },
      {
        label: { en: 'Energy Strategy', es: 'Estrategia Energética' },
        value: {
          en: 'Diversified low-carbon supply',
          es: 'Suministro diversificado bajo en carbono',
        },
      },
      {
        label: { en: 'Connectivity', es: 'Conectividad' },
        value: {
          en: 'Subsea cable adjacency',
          es: 'Adyacencia a cables submarinos',
        },
      },
    ],
  },
  {
    id: 'omais-colon',
    name: 'DC Omais Colón AI',
    region: 'LatAm',
    capacity: '1.2 GW',
    mapLng: -79.90,
    mapLat: 9.35,
    image: 'https://picsum.photos/seed/omais/1200/900',
    imageSrc: '/images/futuro-robot-inteligencia-artificial-fondo-sistema-red-1.jpg',
    pdfSrc: '/projects/dc-omais-colon-ai.pdf',
    tags: ['AI', 'HPC', 'Hyperscale', 'Panama'],
    location: { en: 'Colón Province, Panama', es: 'Provincia de Colón, Panamá' },
    status: { en: 'Development Phase', es: 'Fase de Desarrollo' },
    tagline: {
      en: 'Atlantic corridor hyperscale platform',
      es: 'Plataforma hiperescala del corredor atlántico',
    },
    description: {
      en: 'A gigawatt-scale platform anchoring Panama’s Atlantic corridor, engineered to capture transcontinental connectivity and serve the next decade of AI demand.',
      es: 'Una plataforma a escala de gigavatios que ancla el corredor atlántico del istmo panameño, diseñada para capturar la conectividad transcontinental y atender la próxima década de demanda de IA.',
    },
    highlights: {
      en: [
        'Anchors the Atlantic corridor of the Panamanian isthmus',
        'Gigawatt-scale capacity for large-model training clusters',
        'Strategic connectivity bridging Atlantic and Pacific routes',
        'Built to institutional-grade development standards',
      ],
      es: [
        'Ancla el corredor atlántico del istmo panameño',
        'Capacidad a escala de gigavatios para clústeres de entrenamiento de grandes modelos',
        'Conectividad estratégica que une las rutas atlántica y pacífica',
        'Construido conforme a estándares de desarrollo de grado institucional',
      ],
    },
    specs: [
      {
        label: { en: 'Asset Type', es: 'Tipo de Activo' },
        value: { en: 'Hyperscale AI Campus', es: 'Campus de IA Hiperescala' },
      },
      {
        label: { en: 'Capacity', es: 'Capacidad' },
        value: { en: '1.2 GW IT', es: '1.2 GW IT' },
      },
      {
        label: { en: 'Investment', es: 'Inversión' },
        value: { en: 'US$12 Billion', es: 'US$12 mil millones' },
      },
      {
        label: { en: 'Target Users', es: 'Usuarios Objetivo' },
        value: {
          en: 'Global AI Hyperscalers',
          es: 'Hiperescaladores Globales de IA',
        },
      },
      {
        label: { en: 'Energy Strategy', es: 'Estrategia Energética' },
        value: {
          en: 'Diversified low-carbon supply',
          es: 'Suministro diversificado bajo en carbono',
        },
      },
      {
        label: { en: 'Connectivity', es: 'Conectividad' },
        value: {
          en: 'Trans-isthmus fiber backbone',
          es: 'Red troncal de fibra transístmica',
        },
      },
    ],
  },
]

export const platformPrinciples = [
  {
    en: 'Large-scale deployment capability',
    es: 'Capacidad de despliegue a gran escala',
  },
  { en: 'Long-term energy security', es: 'Seguridad energética a largo plazo' },
  { en: 'Ultra-high reliability', es: 'Fiabilidad ultraelevada' },
  {
    en: 'Strategic fiber connectivity',
    es: 'Conectividad estratégica de fibra',
  },
  {
    en: 'Scalability for future AI workloads',
    es: 'Escalabilidad para futuras cargas de IA',
  },
  {
    en: 'Sustainable infrastructure design',
    es: 'Diseño de infraestructura sostenible',
  },
  {
    en: 'Institutional-grade development standards',
    es: 'Estándares de desarrollo de grado institucional',
  },
]
