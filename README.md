# Black AI

Premium, cinematic website for **Black AI** — a global AI infrastructure development company. Dark luxury tech aesthetic (data-center-meets-finance) built with React + Vite, Tailwind CSS and Framer Motion.

## Stack

- **React 18** + **Vite 5**
- **React Router DOM 6** — client-side routing
- **Tailwind CSS 3** — styling + design tokens
- **Framer Motion 11** — page transitions, scroll reveals, counters
- **Lucide React** — icons
- Google Fonts: Cormorant Garamond (display), Geist Mono (numbers/accents), Inter (body)

## Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## Pages

| Route             | Page          |
| ----------------- | ------------- |
| `/`               | Home          |
| `/quienes-somos`  | Quiénes Somos |
| `/proyectos`      | Proyectos     |
| `/noticias`       | Noticias      |

## Structure

```
src/
  components/   Navbar, Footer, ProjectCard, TeamCard, StatBar, PageHero, Reveal, AnimatedCounter, PageTransition
  pages/        Home, QuienesSomos, Proyectos, Noticias
  data/         projects.js, team.js, news.js   (all content hardcoded)
  index.css     Tailwind + CSS variables + grain texture + animations
  App.jsx       Router + animated page transitions
  main.jsx      Entry
```

## Theming (light default + dark)

The site ships in **light mode by default** with a toggle to a **dark** variant
(Sun/Moon button in the navbar). Both themes share the gold + electric-blue
palette; the gold is slightly deepened in light mode for legibility.

- Theme tokens live in `src/index.css` under `:root` / `[data-theme="light"]`
  (light) and `[data-theme="dark"]` (dark). Components only read CSS variables,
  so the whole site re-themes by swapping the `data-theme` attribute on `<html>`.
- The choice is persisted in `localStorage` and applied pre-paint via a small
  inline script in `index.html` to avoid a flash.

## Internationalization (EN default + ES)

English is the primary language with a working **EN / ES** toggle in the navbar.

- UI strings: `src/i18n/ui.js` (`{ en, es }`).
- Content (projects, team, news, principles): localized fields as `{ en, es }`
  objects in `src/data/*`.
- `src/context/AppContext.jsx` exposes `t(key)` for UI strings and `L(obj)` for
  localized content, plus the language + theme state. Language preference is
  persisted in `localStorage`.

## Design system

Color tokens, fonts and effects are defined as CSS variables in `src/index.css` and mapped in `tailwind.config.js`. Placeholder imagery comes from `picsum.photos` with a grayscale filter. The grain overlay is an inline SVG noise filter applied via the `.grain` utility.
# black-ai
