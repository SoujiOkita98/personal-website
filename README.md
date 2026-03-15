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
- **3D scene** — interactive gallery with a desk, MacBook, and Siege Tank (React Three Fiber)
- **Gallery navigation** — choose destinations from a menu, camera animates between objects
- **Animated models** — Siege Tank transforms to siege mode when visited

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 7](https://vite.dev/) — dev server and build tool
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [Drei](https://github.com/pmndrs/drei) — 3D rendering
- [Three.js](https://threejs.org/) — underlying 3D engine
- [GSAP](https://gsap.com/) — camera animation
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
├── App.tsx                  # Main desktop layout (macOS UI)
├── Scene3D.tsx              # 3D scene orchestrator (camera, phases, navigation)
├── scene.css                # 3D scene overlay styles (buttons, menus)
├── App.css                  # Desktop UI styles (terminal, dock, menu bar)
├── index.css                # CSS variables and global resets
├── main.tsx                 # React entry point
└── components/
    ├── MenuBar.tsx           # Top menu bar with live clock
    ├── Dock.tsx              # Bottom dock with magnification effect
    ├── DesktopIcon.tsx       # Desktop shortcut icons
    ├── MacBookModel.tsx      # MacBook Pro 3D model
    ├── DeskSetup.tsx         # Desk 3D model
    ├── DeskProps.tsx         # Desk accessories (mug, books, wagon)
    ├── PlantModel.tsx        # Plant model
    ├── StudioEnvironment.tsx # Floor plane and studio lighting
    ├── SiegeTankModel.tsx    # Siege Tank 3D model (with animation)
    └── Terminal/
        ├── TerminalWindow.tsx  # Draggable, resizable window chrome
        ├── TerminalBody.tsx    # Terminal input/output and history
        └── commands.ts         # Command definitions and handler

public/
└── models/
    └── siege_tank.glb        # Siege Tank GLB model file
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

## 3D Scene Architecture

The site features an interactive 3D scene where visitors can explore different objects. The scene is managed by `Scene3D.tsx` using a **phase-based state machine**.

### Phase System

```
explore  →  menu  →  tank-zooming  →  tank-view
   ↓                                      ↓
 zooming  →  focused                   (← Back)
   ↓           ↓
(← Back)   (← Back / ESC)
```

| Phase | Description |
|-------|-------------|
| `explore` | Default view — shows "Go to Desk" and "Look Around" buttons |
| `menu` | Destination picker — lists available 3D objects to visit |
| `zooming` | Camera animating toward the desk/laptop |
| `focused` | Viewing the laptop screen (macOS desktop is interactive) |
| `tank-zooming` | Camera animating toward the Siege Tank |
| `tank-view` | Viewing the tank (siege animation plays) |

### Adding a New 3D Model

To add a new exhibit to the gallery:

#### 1. Place the model file

Put your `.glb` file in `public/models/`:
```
public/models/your_model.glb
```

#### 2. Create a model component

Create `src/components/YourModel.tsx` following the pattern in `SiegeTankModel.tsx`:

```tsx
import { useRef, useEffect, useCallback } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

const MODEL_PATH = '/models/your_model.glb'
const MODEL_SCALE = 1.0  // adjust to fit the scene

interface YourModelProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  onBoundsReady?: (center: THREE.Vector3, size: THREE.Vector3) => void
}

export default function YourModel({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onBoundsReady,
}: YourModelProps) {
  const group = useRef<THREE.Group>(null)
  const { scene } = useGLTF(MODEL_PATH)
  const boundsReported = useRef(false)

  // Shadows + material tweaks
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [scene])

  // Report world-space bounds for dynamic camera targeting
  const reportBounds = useCallback(() => {
    if (!group.current || boundsReported.current || !onBoundsReady) return
    boundsReported.current = true
    const box = new THREE.Box3().setFromObject(group.current)
    const center = new THREE.Vector3()
    const size = new THREE.Vector3()
    box.getCenter(center)
    box.getSize(size)
    onBoundsReady(center, size)
  }, [onBoundsReady])

  useEffect(() => {
    requestAnimationFrame(reportBounds)
  }, [reportBounds, scene])

  return (
    <group ref={group} position={position} rotation={rotation} scale={MODEL_SCALE}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload(MODEL_PATH)
```

**Key points:**
- `onBoundsReady` reports the model's world-space bounding box — this is how `Scene3D.tsx` knows where to point the camera. Without this, you'd have to hardcode camera positions.
- `useGLTF` caches models — material modifications (like `multiplyScalar`) need a guard to prevent re-application on HMR. Use `userData` flags or store original values.
- If your model has animations, use `useAnimations` (see `SiegeTankModel.tsx`). Call `skeleton.pose()` on mount to reset cached animation state.

#### 3. Register in Scene3D.tsx

**a) Add position/rotation constants:**
```tsx
const YOUR_MODEL_POSITION: [number, number, number] = [x, y, z]
const YOUR_MODEL_ROTATION: [number, number, number] = [0, angle, 0]
```

> **Positioning tip:** Models with asymmetric geometry + rotation will have their visual center offset from the `position` value. Use `onBoundsReady` to log the actual world center and adjust accordingly. The Siege Tank's visual center is ~6 units offset from its position due to asymmetric geometry.

**b) Add new phases** to the Phase type:
```tsx
type Phase = '...' | 'your-model-zooming' | 'your-model-view'
```

**c) Add a bounds handler** (same pattern as `handleTankBounds`):
```tsx
const handleYourModelBounds = useCallback((center, size) => {
  const maxDim = Math.max(size.x, size.y, size.z)
  const dist = maxDim * 1.2
  // Store camera target and position for animation
}, [])
```

**d) Add the component to the JSX** inside the Canvas:
```tsx
<YourModel
  position={YOUR_MODEL_POSITION}
  rotation={YOUR_MODEL_ROTATION}
  onBoundsReady={handleYourModelBounds}
/>
```

**e) Add a menu entry** in the `phase === 'menu'` section:
```tsx
<button className="enter-button" onClick={() => handleMenuSelect('your-model')}>
  <span className="enter-button-text" data-text="Your Model">Your Model</span>
</button>
```

**f) Handle the new destination** in `handleMenuSelect`:
```tsx
if (destination === 'your-model') {
  setPhase('your-model-zooming')
  // trigger camera animation
}
```

#### 4. Add an exhibit description card

When the user is viewing a model, a description card appears in the bottom-right corner. Add one for your model in `Scene3D.tsx`, inside the return JSX:

```tsx
{phase === 'your-model-view' && (
  <div className="exhibit-card">
    <h2 className="exhibit-title">Your Model Name</h2>
    <p className="exhibit-desc">
      Write a fun, casual description here — why you like it, what it means to you,
      or any story behind it. Keep it personal and conversational.
    </p>
    <span className="exhibit-credit">
      Model by <a href="https://..." target="_blank" rel="noopener noreferrer">Author</a> · License
    </span>
  </div>
)}
```

The card uses these pre-built CSS classes (defined in `scene.css`):
- `.exhibit-card` — frosted glass container, fades in with a 0.8s delay after the camera arrives
- `.exhibit-title` — pixel font heading, uppercase
- `.exhibit-desc` — system font body text. Use `<em>` for emphasis (slightly brighter)
- `.exhibit-credit` — small muted text for attribution with hover-brightening links

On mobile, the card stretches full-width automatically.

#### 5. Add attribution

Add credit to `src/components/Terminal/commands.ts` in the `credits` command output.

### Coordinate System Reference

```
        -Z (behind desk / "forward" from viewer)
         |
         |
  -X ----+---- +X
(left)   |   (right)
         |
        +Z (toward viewer)

Camera: [2.0, 1.8, 1.0] looking at [0, 0.9, -1.4]
Desk: origin [0, 0, 0]
Laptop screen: faces -Z (screen target at Z=-1.92)

Clock directions (top-down, 12 o'clock = -Z):
  12 = [0, 0, -N]      (directly behind desk)
  10 = [-N, 0, -N]     (behind-left)
   3 = [+N, 0, 0]      (right of desk)
   6 = [0, 0, +N]      (in front, toward camera)
```

### Lighting Tips

- **Directional lights** illuminate the entire scene equally — avoid these if you only want to light one model.
- **Point lights** with `distance` parameter create localized lighting. Position them near the model's world center (use `onBoundsReady` to find it).
- Dark model textures may need `mat.color.multiplyScalar(N)` to brighten. Guard this with `userData` flags to prevent cumulative brightening on HMR.
- `envMapIntensity` controls how much the environment map reflects — higher values make metallic surfaces pop.
- Reduce `roughness` to make surfaces more reflective.

## Deployment

Deployed on [Vercel](https://vercel.com). Push to `main` and Vercel handles the rest.

## Credits

- **Siege Tank Story - Starcraft 2** by [Catholomew](https://skfb.ly/oXJGR) — Licensed under [CC BY-NC 4.0](http://creativecommons.org/licenses/by-nc/4.0/)

## License

MIT
