# Black AI

Web corporativa de Black AI, empresa global de infraestructura digital (centros de datos para IA y HPC) en Europa y Latinoamérica. Cliente recurrente de Agutidesigns.

## Dónde está publicada
- https://black-ai-iota.vercel.app (proyecto de Vercel `black-ai`; aún sin dominio propio)

## Tecnología
- React 18 + Vite + Tailwind + Framer Motion + React Router.
- Supabase para noticias, equipo, galería y métricas (esquemas en `supabase-*.sql`), con panel admin.
- Formulario de contacto con EmailJS.

## Estructura
- `src/pages/`: Inicio, Quiénes somos, Proyectos, Noticias.
- `src/components/`: Navbar, Footer, tarjetas, contadores…
- `src/data/`: proyectos, equipo y noticias. `src/admin/`: panel. `src/i18n/`: idiomas.

## Importante en este proyecto
- Estilo premium y editorial, negro con detalles dorados. Mantén esa línea en cualquier cambio.

## Cómo se publica un cambio
1. Haz el cambio en la rama `main` (o en una rama y luego fusiónala).
2. Antes de subir, comprueba que compila: `npm install` y `npm run build`.
3. Al subir a `main`, Vercel publica solo en 1-2 minutos (proyecto `black-ai`). No hace falta tocar nada más.
4. Cuando termines, dile a Alejandro qué has cambiado y en qué URL puede verlo.

## Reglas para trabajar aquí
- Responde siempre en español, claro y sin tecnicismos innecesarios: Alejandro no es programador.
- Las claves (Stripe, Supabase, APIs) viven en las variables de entorno de Vercel. Nunca las escribas en el código ni las subas a GitHub.
- Pregunta antes de: borrar contenido, cambiar precios o pagos, tocar la base de datos, cambiar dominios o variables de Vercel, o enviar algo al cliente.
- Cambios de texto, imágenes, colores o secciones: hazlos directamente.
- Este repositorio es de un cliente de Agutidesigns (Alejandro "Guti"). No mezcles nada de otros clientes.
