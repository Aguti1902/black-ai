/**
 * Black AI — Chat assistant knowledge base.
 * Each intent has: keywords (matched against lowercased user input),
 * and responses in 'en' and 'es'.
 */
export const intents = [
  {
    id: 'greeting',
    keywords: ['hello', 'hi', 'hey', 'hola', 'buenos', 'buenas', 'saludos', 'good morning', 'good afternoon'],
    en: "Hello! I'm the Black AI assistant. I can answer questions about our company, projects, energy strategy, and investment platform. What would you like to know?",
    es: "¡Hola! Soy el asistente de Black AI. Puedo responderte preguntas sobre nuestra empresa, proyectos, estrategia energética y plataforma de inversión. ¿En qué puedo ayudarte?",
  },
  {
    id: 'what_is',
    keywords: ['what is black ai', 'what is', 'who are you', 'about black ai', 'tell me about', 'qué es', 'quiénes son', 'qué hace', 'sobre black ai', 'describe'],
    en: "Black AI is a global digital infrastructure platform focused exclusively on the origination, development, monetization, and long-term ownership of hyperscale data center assets designed for Artificial Intelligence, HPC, cloud services, and next-generation digital ecosystems. We operate across Europe and Latin America.",
    es: "Black AI es una plataforma global de infraestructura digital centrada exclusivamente en la originación, desarrollo, monetización y propiedad a largo plazo de activos de centros de datos a hiperescala diseñados para Inteligencia Artificial, HPC, servicios en la nube y ecosistemas digitales de nueva generación. Operamos en Europa y América Latina.",
  },
  {
    id: 'projects',
    keywords: ['projects', 'project', 'campuses', 'campus', 'data center', 'datacenter', 'proyectos', 'proyecto', 'campus', 'centro de datos', 'developments'],
    en: "Black AI is developing four hyperscale AI campuses: DC Malpica AI (300 MW, Toledo, Spain), DC Córdoba AI (300 MW, Córdoba, Spain), DC Santa María de la Antigua AI (1.2 GW, Panama City), and DC Omais Colón AI (1.2 GW, Colón Province, Panama). Total pipeline: 3.6 GW across two continents.",
    es: "Black AI desarrolla cuatro campus de IA a hiperescala: DC Malpica AI (300 MW, Toledo, España), DC Córdoba AI (300 MW, Córdoba, España), DC Santa María de la Antigua AI (1,2 GW, Ciudad de Panamá) y DC Omais Colón AI (1,2 GW, Provincia de Colón, Panamá). Pipeline total: 3,6 GW en dos continentes.",
  },
  {
    id: 'malpica',
    keywords: ['malpica', 'toledo', 'spain', 'españa', 'espana'],
    en: "DC Malpica AI is a 300 MW hyperscale AI infrastructure campus in Toledo, central Spain. It is strategically positioned within the central Spanish energy grid, designed for ultra-high-density AI and HPC workloads, with direct access to renewable energy corridors and carrier-neutral fiber connectivity.",
    es: "DC Malpica AI es un campus de infraestructura de IA de 300 MW en Toledo, centro de España. Está posicionado estratégicamente dentro de la red energética del centro de España, diseñado para cargas de IA y HPC de altísima densidad, con acceso directo a corredores de energía renovable y conectividad de fibra neutral de operador.",
  },
  {
    id: 'cordoba',
    keywords: ['córdoba', 'cordoba', 'andalusia', 'andalucía', 'southern spain', 'sur de españa'],
    en: "DC Córdoba AI is a 300 MW AI campus in Córdoba, southern Spain, leveraging abundant solar generation. It is engineered to institutional-grade reliability standards with a long-term power purchase strategy and scalable footprint for future AI workload expansion.",
    es: "DC Córdoba AI es un campus de IA de 300 MW en Córdoba, sur de España, que aprovecha la abundante generación solar. Está diseñado conforme a estándares de fiabilidad de grado institucional, con una estrategia de compra de energía a largo plazo y huella escalable para la futura expansión de cargas de IA.",
  },
  {
    id: 'panama',
    keywords: ['panama', 'panamá', 'santa maria', 'santa maría', 'omais', 'colón', 'colon', 'latam', 'latin america', 'americas', 'subsea', 'submarine'],
    en: "In Panama, Black AI is developing two gigawatt-scale platforms: DC Santa María de la Antigua AI (1.2 GW) in Panama City — our flagship Americas campus at the crossroads of global subsea connectivity — and DC Omais Colón AI (1.2 GW) in Colón Province, anchoring Panama's Atlantic corridor. Combined investment: US$24 billion.",
    es: "En Panamá, Black AI desarrolla dos plataformas a escala de gigavatios: DC Santa María de la Antigua AI (1,2 GW) en Ciudad de Panamá — nuestro campus insignia en las Américas en el cruce de la conectividad submarina global — y DC Omais Colón AI (1,2 GW) en la Provincia de Colón, ancla del corredor atlántico. Inversión combinada: US$24.000 millones.",
  },
  {
    id: 'capacity',
    keywords: ['capacity', 'mw', 'gw', 'megawatt', 'gigawatt', 'capacidad', 'potencia', 'how big', 'tamaño', 'scale'],
    en: "Black AI's total pipeline spans 3.6 GW of IT capacity across four hyperscale campuses. This includes 600 MW in Spain (2 × 300 MW) and 2.4 GW in Panama (2 × 1.2 GW), representing a total investment exceeding $30 billion.",
    es: "El pipeline total de Black AI abarca 3,6 GW de capacidad IT en cuatro campus a hiperescala: 600 MW en España (2 × 300 MW) y 2,4 GW en Panamá (2 × 1,2 GW), con una inversión total superior a $30.000 millones.",
  },
  {
    id: 'investment',
    keywords: ['investment', 'invest', 'funding', 'billion', 'money', 'capital', 'financial', 'inversión', 'invertir', 'financiación', 'millones', 'capital'],
    en: "Black AI's total development pipeline represents over $30 billion in investment. The European campuses in Spain represent approximately €6 billion, while the two Panama platforms represent approximately US$24 billion. We work with institutional-grade capital structures designed for long-term ownership.",
    es: "El pipeline de desarrollo de Black AI representa más de $30.000 millones en inversión. Los campus europeos en España representan aproximadamente €6.000 millones, mientras que las dos plataformas de Panamá representan aproximadamente US$24.000 millones. Trabajamos con estructuras de capital de grado institucional diseñadas para la propiedad a largo plazo.",
  },
  {
    id: 'energy',
    keywords: ['energy', 'renewable', 'solar', 'power', 'electricity', 'green', 'sustainability', 'energía', 'renovable', 'solar', 'sostenibilidad', 'electricidad', 'ppa'],
    en: "Energy security is a cornerstone of our strategy. Our Spanish campuses leverage renewable energy corridors and solar generation, with long-term Power Purchase Agreements (PPAs). Our Panama projects use diversified low-carbon supply. We engineer for long-term energy security at gigawatt scale.",
    es: "La seguridad energética es un pilar de nuestra estrategia. Nuestros campus españoles aprovechan los corredores de energía renovable y la generación solar, con Acuerdos de Compra de Energía (PPA) a largo plazo. Nuestros proyectos en Panamá utilizan suministro diversificado bajo en carbono. Diseñamos para la seguridad energética a largo plazo a escala de gigavatios.",
  },
  {
    id: 'team',
    keywords: ['team', 'management', 'ceo', 'leadership', 'founders', 'who runs', 'equipo', 'directivos', 'fundadores', 'quién dirige', 'liderazgo'],
    en: "Black AI's leadership team combines deep expertise in infrastructure development, energy, capital markets, and international business. Our management team is assembled to drive the company's dual-continent development platform across Europe and Latin America. Visit our 'Who We Are' page to meet the full team.",
    es: "El equipo directivo de Black AI combina profunda experiencia en desarrollo de infraestructura, energía, mercados de capital y negocios internacionales. Nuestro equipo directivo está ensamblado para impulsar la plataforma de desarrollo de la empresa en los dos continentes: Europa y América Latina. Visita nuestra página 'Quiénes Somos' para conocer al equipo completo.",
  },
  {
    id: 'contact',
    keywords: ['contact', 'email', 'reach', 'get in touch', 'office', 'location', 'address', 'contacto', 'contactar', 'dirección', 'oficina', 'donde están', 'dónde'],
    en: "To get in touch with Black AI, please visit our website's contact section or reach out through our 'Who We Are' page. Our headquarters information is available on the site.",
    es: "Para contactar con Black AI, visita la sección de contacto de nuestra web o accede a través de nuestra página 'Quiénes Somos'. La información de nuestra sede está disponible en el sitio.",
  },
  {
    id: 'hyperscale',
    keywords: ['hyperscale', 'hiperescala', 'ai workload', 'hpc', 'high performance', 'large model', 'training', 'inference', 'gpu', 'compute', 'cloud'],
    en: "Black AI's campuses are engineered for hyperscale AI workloads — including large-model training, inference, HPC, and cloud services. Our facilities are designed for ultra-high-density compute, meeting the demanding requirements of global AI hyperscalers like major cloud providers and AI companies.",
    es: "Los campus de Black AI están diseñados para cargas de trabajo de IA a hiperescala — incluyendo entrenamiento de grandes modelos, inferencia, HPC y servicios en la nube. Nuestras instalaciones están diseñadas para cómputo de altísima densidad, cumpliendo los exigentes requisitos de los hiperescaladores globales de IA como los principales proveedores de nube y empresas de IA.",
  },
  {
    id: 'connectivity',
    keywords: ['connectivity', 'fiber', 'network', 'internet', 'bandwidth', 'subsea cable', 'conectividad', 'fibra', 'red', 'cable submarino'],
    en: "Connectivity is a key differentiator for Black AI. Our European campuses feature carrier-neutral fiber connectivity to major European hubs. Our Panama campuses benefit from proximity to global subsea cable landing points, positioning them as primary nodes for hemispheric AI compute.",
    es: "La conectividad es un diferenciador clave para Black AI. Nuestros campus europeos cuentan con conectividad de fibra neutral de operador hacia los principales hubs europeos. Nuestros campus en Panamá se benefician de la proximidad a puntos de amarre de cables submarinos globales, posicionándolos como nodos principales de cómputo de IA hemisférico.",
  },
  {
    id: 'platform',
    keywords: ['platform', 'model', 'business model', 'strategy', 'platform principles', 'how do you work', 'modelo', 'plataforma', 'cómo funciona', 'estrategia'],
    en: "The Black AI platform is built on seven principles: large-scale deployment capability, long-term energy security, ultra-high reliability, strategic fiber connectivity, scalability for future AI workloads, sustainable infrastructure design, and institutional-grade development standards.",
    es: "La plataforma Black AI se construye sobre siete principios: capacidad de despliegue a gran escala, seguridad energética a largo plazo, fiabilidad ultraelevada, conectividad estratégica de fibra, escalabilidad para futuras cargas de IA, diseño de infraestructura sostenible y estándares de desarrollo de grado institucional.",
  },
  {
    id: 'fallback',
    keywords: [],
    en: "I'm not sure I have a specific answer for that. I can help you with information about Black AI's projects, investment platform, energy strategy, team, and connectivity. You can also explore our website for more details. Is there something specific I can help you with?",
    es: "No estoy seguro de tener una respuesta específica para eso. Puedo ayudarte con información sobre los proyectos de Black AI, la plataforma de inversión, la estrategia energética, el equipo y la conectividad. También puedes explorar nuestra web para más detalles. ¿Hay algo concreto en lo que pueda ayudarte?",
  },
]

/**
 * Quick-suggestion chips shown at chat open.
 */
export const suggestions = {
  en: [
    'What is Black AI?',
    'Tell me about your projects',
    'Investment & capacity',
    'Energy strategy',
    'How to contact you?',
  ],
  es: [
    '¿Qué es Black AI?',
    'Cuéntame sobre vuestros proyectos',
    'Inversión y capacidad',
    'Estrategia energética',
    '¿Cómo contactar?',
  ],
}
