# Portfolio Client (oluferanmi-sec.me)

Next.js 14 (App Router) + Tailwind + Framer Motion.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env.local`, point `NEXT_PUBLIC_API_URL` at your backend.
3. Drop your resume PDF at `public/resume.pdf` (the hero's "Download resume" button links there).
4. `npm run dev`

## Design system

- Palette, type, and layout tokens live in `tailwind.config.js` and `app/globals.css`.
  Colors are CSS variables so dark/light mode is just swapping a class — no
  duplicate Tailwind config.
- **Dark/light toggle**: a floating button (top-right) switches themes and
  remembers the choice in `localStorage`. An inline script in `layout.tsx`
  applies the stored theme before first paint, so there's no flash of the
  wrong theme on load.
- Fonts: Space Grotesk (headings), Inter (body), JetBrains Mono (technical/tag
  text) — loaded via `next/font/google`, self-hosted automatically by Next.js.
- The homepage (`app/page.tsx`) pulls live content from the API with graceful fallback
  to the resume-derived placeholder content baked into each component, so the site
  looks complete even before you've added anything via the admin panel.
- Admin panel: `/admin/login` → `/admin/dashboard`. Full create/edit/delete for
  projects, certifications, and skills, plus a read-only inbox (mark read / delete).
  Field definitions live in `lib/adminFields.ts` — add a field there and it shows up
  in the form automatically.

## Your photo and video

- Drop your headshot at `public/image/imagemine.jpg` — it renders in a circular
  frame right below the access-check animation in the hero.
- Drop a short intro video at `public/video/videomine.mp4` — it renders in its
  own section right after the hero, with native browser controls.
