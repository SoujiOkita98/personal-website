# Gavin's Personal Website

macOS-inspired personal site with an interactive terminal, a 3D desktop/gallery, and a blog.

Live at **[gavinzhu.com](https://gavinzhu.com)**.

## Stack

- **React + TypeScript** (UI), **Three.js + @react-three/fiber** (3D scene), **GSAP** (animation)
- **react-router-dom** for routing
- **Vite** for dev/build
- Deployed on **Cloudflare Workers (Static Assets)** — see [Deploy](#deploy)

## Run locally

```bash
npm install
npm run dev          # dev server with hot reload
npm run build        # type-check (tsc) + production build into dist/
npm run preview      # serve the built dist/ locally (what Cloudflare serves)
```

Always run `npm run build` before pushing — it runs `tsc` and will catch type errors the dev server hides.

## How it's structured

Two routes, defined in `src/main.tsx`:

| Route    | Renders                | Notes |
|----------|------------------------|-------|
| `/`      | `Scene3D` (the 3D desktop) | Lazy-loaded, so the heavy Three.js bundles only download here |
| `/blog`  | `src/pages/Blog.tsx`   | Lightweight standalone page — **no 3D engine loads** |

The 3D desktop (`src/App.tsx`) is rendered onto the MacBook screen inside the scene. It hosts:
- **Terminal** (`src/components/Terminal/`) — typed commands like `about`, `whoami`, `blog`
- **Blog window** (`src/components/BlogWindow.tsx`) — the blog shown *inside* the desktop
- Desktop icons + Dock

There are four doors into the blog, all wired to the same content:
1. Terminal command `blog` → opens the in-desktop blog window
2. Desktop "blog" icon / Dock → opens the in-desktop blog window
3. Loading screen link "or go straight to my blog → /blog" (`src/Scene3D.tsx`)
4. Direct URL `gavinzhu.com/blog` → the standalone page

## Adding a blog post

**One source of truth: `src/blog/posts.tsx`.** Both the `/blog` page and the in-desktop
blog window read from this array, so editing it updates everywhere.

Add a new object to the **top** of the `posts` array (newest first):

```tsx
{
  slug: 'my-post-slug',          // url-safe; becomes the #anchor and share link
  date: '2026-06-04',            // YYYY-MM-DD, shown on the card
  tag: 'ai',                     // short label chip (e.g. 'ai', 'meta')
  title: 'My post title',
  body: (
    <>
      <p>First paragraph.</p>
      <p>
        A paragraph with <strong>bold</strong> and a{' '}
        <a href="https://example.com" target="_blank" rel="noopener noreferrer">link</a>.
      </p>
    </>
  ),
},
```

`body` is JSX. Supported elements are styled in `src/pages/blog.css`: `<p>`, `<a>`
(underlined), `<strong>`, `<blockquote>`. Many posts here are a short blurb plus a
link out to the full piece on Substack — that's the intended pattern, not a limitation.

No build config or routing changes are needed to add a post.

## Adding a terminal command

Edit `src/components/Terminal/commands.ts` — add an entry to the `COMMANDS` map and a
line to the `help` output. Commands that open windows (like `blog`, `ziwei`) are
special-cased in `src/components/Terminal/TerminalBody.tsx` instead.

## Deploy

Push to `main` → GitHub Actions (`.github/workflows/`) builds and deploys to Cloudflare
Workers Static Assets. **Pushing to `main` deploys to production (gavinzhu.com).**

`wrangler.toml` sets `not_found_handling = "single-page-application"` so client-side
routes like `/blog` resolve on a direct visit or refresh (Cloudflare serves `index.html`
and the router takes over). Without that, hitting `/blog` directly would 404.

## Credits

- **MacBook Pro** by [jackbaeten](https://sketchfab.com/jackbaeten) — CC BY
- **Siege Tank Story - Starcraft 2** by [Catholomew](https://skfb.ly/oXJGR) — CC BY-NC 4.0
- **Sony PSP** by [Ilya Ostrovsky](https://skfb.ly/6CXrr) — CC BY 4.0
- **Nintendo 3DS XL** by [Keita-sama](https://skfb.ly/o6xpZ) — CC BY 4.0

Inspired by [Henry Heffernan](https://github.com/henryheffernan)'s Three.js portfolio. Built with [Claude](https://claude.ai).

## License

MIT
