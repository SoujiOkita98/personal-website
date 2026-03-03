# Gavin's Personal Website

A macOS-inspired personal website built with React and TypeScript. The entire site is designed to look and feel like a Mac desktop — complete with a draggable terminal window, a functional Dock, and a top menu bar.

## Preview

The site features:

- **Terminal emulator** — interactive shell with commands like `about`, `whoami`, `experience`, `skills`, `neofetch`, and more
- **Draggable window** — click and drag the title bar, go fullscreen with the green button, or close/minimize
- **macOS Dock** — hover-magnification effect, quick links to GitHub and email
- **Desktop icons** — double-click to open external projects
- **Menu bar** — live clock, app name, and classic macOS menu items
- **Responsive** — works on mobile and desktop

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 7](https://vite.dev/) — dev server and build tool
- [Lucide React](https://lucide.dev/) — icon library

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── App.tsx                  # Main desktop layout
├── App.css                  # All styles (desktop, terminal, dock, menu bar)
├── index.css                # CSS variables and global resets
├── main.tsx                 # React entry point
└── components/
    ├── MenuBar.tsx           # Top menu bar with live clock
    ├── Dock.tsx              # Bottom dock with magnification effect
    ├── DesktopIcon.tsx       # Desktop shortcut icons
    └── Terminal/
        ├── TerminalWindow.tsx  # Draggable, resizable window chrome
        ├── TerminalBody.tsx    # Terminal input/output and history
        └── commands.ts         # Command definitions and handler
```

## Terminal Commands

| Command | Description |
|---------|-------------|
| `help` | List all available commands |
| `about` | About me |
| `whoami` | Quick bio |
| `education` | Where I studied |
| `experience` | Work history |
| `skills` | What I know |
| `projects` | Things I'm building |
| `contact` | How to reach me |
| `neofetch` | System info (macOS style) |
| `clear` | Clear the terminal |

## Deployment

Deployed on [Vercel](https://vercel.com). Push to `main` and Vercel handles the rest.

## License

MIT
