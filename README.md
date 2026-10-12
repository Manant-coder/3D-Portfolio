# Manant Prajapati: 3D Glass Portfolio

React 18 + Vite + TypeScript + Three.js (React Three Fiber, Drei) + Framer Motion.
Frontend only: no backend, no database, no paid APIs.

## Run it on Windows (Command Prompt)

You need Node.js 18 or newer (20 LTS recommended). Check with `node -v`.
Download from https://nodejs.org if it is missing.

```cmd
cd C:\path\to\manant-portfolio
npm install
npm run dev
```

The browser opens at http://localhost:5173. Press Ctrl + C in the terminal to stop.

Other commands:

```cmd
npm run build      :: type-check and create the production build in dist\
npm run preview    :: serve the production build locally
```

## Things you can edit

| What | Where |
| --- | --- |
| Name, email, GitHub, LinkedIn, texts, education, experience, resume path | `src/data/profile.ts` |
| Project descriptions and links | `src/data/projects.ts` |
| Skills | `src/data/skills.ts` |
| Colours and fonts | top of `src/index.css` (`:root`) |

### Resume
1. Copy your PDF to `public\resume.pdf`
2. In `src/data/profile.ts` set `resumeUrl: '/resume.pdf'`

Until then the "Download Resume" button is disabled.

### Project links
In `src/data/projects.ts` fill the `url` of each `primary` (View Project / Live Preview)
and `github` link. An empty url keeps the button disabled, so no fake links are shown.

## Notes
- The contact form opens the visitor's email app (`mailto:`). Nothing is sent or stored.
- `prefers-reduced-motion` is respected (3D scene stops animating, entrance animations off).
- If WebGL is unavailable, a CSS-only version of the hero scene is shown.
- Fonts (Sora, DM Sans) load from Google Fonts; system fonts are used if offline.





## TO Run That Project 
- Extract File 
- Open Terminal
- npm install
- npm run dev

