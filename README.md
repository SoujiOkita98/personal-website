# Gavin's Personal Website

A macOS-inspired personal website built with React and Three.js. The site looks and feels like a Mac desktop — with a draggable terminal, a functional Dock, and a 3D gallery of things I care about.

## Features

- **Terminal emulator** — interactive shell with commands like `about`, `whoami`, `experience`, `skills`, `neofetch`, and more
- **macOS desktop** — draggable window, Dock with hover-magnification, menu bar with live clock, desktop icons
- **3D gallery** — explore a desk setup, Siege Tank (with siege-mode animation), and a Gaming Corner with PSP and 3DS models
- **Progressive disclosure** — camera animates between exhibits; nested menus reveal more as you explore

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [Drei](https://github.com/pmndrs/drei) + [Three.js](https://threejs.org/)
- [GSAP](https://gsap.com/) — camera animation
- [Lucide React](https://lucide.dev/) — icons

## Getting Started

```bash
npm install
npm run dev
```

## Deployment

Deployed on [Cloudflare Pages](https://pages.cloudflare.com). Push to `main` and Cloudflare handles the rest.

## Credits

### 3D Models

- **MacBook Pro** by [jackbaeten](https://sketchfab.com/jackbaeten) — CC BY
- **Siege Tank Story - Starcraft 2** by [Catholomew](https://skfb.ly/oXJGR) — CC BY-NC 4.0
- **Sony PSP** by [Ilya Ostrovsky](https://skfb.ly/6CXrr) — CC BY 4.0
- **Nintendo 3DS XL** by [Keita-sama](https://skfb.ly/o6xpZ) — CC BY 4.0

### Acknowledgments

- [Henry Heffernan](https://github.com/henryheffernan) — his open-source Three.js portfolio was a major inspiration. Thank you for sharing your work; I learned a lot from studying your code.
- Built with assistance from [Claude](https://claude.ai) by Anthropic.

## License

MIT
