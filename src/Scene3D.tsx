import { useRef, useState, useCallback, useEffect, Suspense } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Lightformer, useProgress } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import MacBookModel from './components/MacBookModel'
import SiegeTankModel from './components/SiegeTankModel'
import StudioEnvironment from './components/StudioEnvironment'
import DeskSetup from './components/DeskSetup'
import PlantModel from './components/PlantModel'
import { CoffeeMug, BookStack, StationWagon } from './components/DeskProps'
import CouchScene from './components/CouchScene'
import './scene.css'

// MacBook position relative to desk group
const MACBOOK_POS: [number, number, number] = [0, 0.74, 0]

// Camera target: the MacBook screen center in world coords
const SCREEN_TARGET: [number, number, number] = [0, 0.98, -1.92]

// Starting camera position (must match Canvas camera prop)
const INITIAL_CAM_POS: [number, number, number] = [2.0, 1.8, 1.0]
const ORBIT_TARGET: [number, number, number] = [0, 0.9, -1.4]
const BASE_FOV = 45
const BASE_FOV_ASPECT = 16 / 10
const MIN_FOV = 42
const MAX_FOV = 58
const FOV_BLEND = 0.25
const BASE_SCREEN_FOCUS_DISTANCE = 0.8
const MOBILE_SCREEN_FOCUS_DISTANCE = 0.92
const MOBILE_SCREEN_MAX_WIDTH = 768
const MOBILE_PORTRAIT_ASPECT = 0.85

// Siege tank placement (world coords, 10 o'clock from the desk)
const TANK_POSITION: [number, number, number] = [3, 0, -10]
const TANK_ROTATION: [number, number, number] = [0, Math.PI * 0.6 - Math.PI / 2, 0]

// Couch scene placement (left of desk, ~9 o'clock)
const COUCH_POSITION: [number, number, number] = [-2.5, 0, 0]
const COUCH_ROTATION: [number, number, number] = [0, Math.PI * 0.3, 0]
const MIN_LOADING_SCREEN_MS = 800
const NAME_ASCII = String.raw`
   _____     __      _______ _   _
  / ____|   /\ \    / /_   _| \ | |
 | |  __   /  \ \  / /  | | |  \| |
 | | |_ | / /\ \ \/ /   | | | . ' |
 | |__| |/ ____ \  /   _| |_| |\  |
  \_____/_/    \_\/   |_____|_| \_|

   _____ _    _         _   _      _ _____
  / ____| |  | |  /\   | \ | |    | |_   _|   /\
 | |  __| |  | | /  \  |  \| |    | | | |    /  \
 | | |_ | |  | |/ /\ \ | . ' |_   | | | |   / /\ \
 | |__| | |__| / ____ \| |\  | |__| |_| |_ / ____ \
  \_____|\____/_/    \_\_| \_|\____/|_____/_/    \_\

  _______    _ _    _
 |___  / |  | | |  | |
    / /| |__| | |  | |
   / / |  __  | |  | |
  / /__| |  | | |__| |
 /_____|_|  |_|\____/
`

function getAdaptiveFov(aspect: number) {
  if (aspect <= 0) return BASE_FOV

  // Keep framing stable on narrow viewports by partially preserving horizontal FOV.
  const baseVerticalRadians = (BASE_FOV * Math.PI) / 180
  const baseHorizontalRadians = 2 * Math.atan(Math.tan(baseVerticalRadians / 2) * BASE_FOV_ASPECT)
  const preservedHorizontalVerticalRadians = 2 * Math.atan(Math.tan(baseHorizontalRadians / 2) / aspect)
  const preservedHorizontalVerticalDegrees = (preservedHorizontalVerticalRadians * 180) / Math.PI
  const blended = BASE_FOV + (preservedHorizontalVerticalDegrees - BASE_FOV) * FOV_BLEND

  return Math.min(MAX_FOV, Math.max(MIN_FOV, blended))
}

function getScreenFocusDistance(width: number, height: number) {
  const aspect = width / Math.max(height, 1)

  if (width <= MOBILE_SCREEN_MAX_WIDTH && aspect <= MOBILE_PORTRAIT_ASPECT) {
    return MOBILE_SCREEN_FOCUS_DISTANCE
  }

  return BASE_SCREEN_FOCUS_DISTANCE
}

function CameraAnimator({
  controlsRef,
  onZoomIn,
  onZoomOut,
  onTankZoomIn,
  onTankZoomOut,
  onCouchZoomIn,
  onCouchZoomOut,
  onPSPZoomIn,
  onPSPZoomOut,
  on3DSZoomIn,
  on3DSZoomOut,
}: {
  controlsRef: React.RefObject<React.ComponentRef<typeof OrbitControls> | null>
  onZoomIn: () => void
  onZoomOut: () => void
  onTankZoomIn: () => void
  onTankZoomOut: () => void
  onCouchZoomIn: () => void
  onCouchZoomOut: () => void
  onPSPZoomIn: () => void
  onPSPZoomOut: () => void
  on3DSZoomIn: () => void
  on3DSZoomOut: () => void
}) {
  const { camera } = useThree()
  const currentTarget = useRef<'none' | 'screen' | 'tank' | 'couch'>('none')

  // Helper: animate camera to a position looking at a target, then call onDone
  const animateTo = useCallback(
    (
      pos: [number, number, number],
      lookAt: [number, number, number],
      duration: number,
      onDone: () => void,
      restoreOrbit?: { target: [number, number, number] },
    ) => {
      if (controlsRef.current) controlsRef.current.enabled = false

      gsap.to(camera.position, {
        x: pos[0],
        y: pos[1],
        z: pos[2],
        duration,
        ease: 'power2.inOut',
        onUpdate: () => {
          camera.lookAt(lookAt[0], lookAt[1], lookAt[2])
          camera.updateProjectionMatrix()
        },
        onComplete: () => {
          camera.lookAt(lookAt[0], lookAt[1], lookAt[2])
          camera.updateProjectionMatrix()
          if (controlsRef.current) {
            const t = restoreOrbit?.target ?? lookAt
            controlsRef.current.target.set(t[0], t[1], t[2])
            controlsRef.current.enabled = true
          }
          onDone()
        },
      })
    },
    [camera, controlsRef],
  )

  // ── Screen zoom ──
  const zoomToScreen = useCallback(() => {
    if (currentTarget.current !== 'none') return
    currentTarget.current = 'screen'
    const focusDistance = getScreenFocusDistance(window.innerWidth, window.innerHeight)
    animateTo(
      [SCREEN_TARGET[0], SCREEN_TARGET[1], SCREEN_TARGET[2] + focusDistance],
      SCREEN_TARGET,
      2.5,
      onZoomIn,
    )
  }, [animateTo, onZoomIn])

  const zoomOutFromScreen = useCallback(() => {
    if (currentTarget.current !== 'screen') return
    currentTarget.current = 'none'
    animateTo(INITIAL_CAM_POS, ORBIT_TARGET, 2.0, onZoomOut, { target: ORBIT_TARGET })
  }, [animateTo, onZoomOut])

  // ── Tank zoom ──
  const zoomToTank = useCallback(() => {
    if (currentTarget.current !== 'none') return
    const w = window as unknown as Record<string, [number, number, number]>
    const tankTarget = w.__tankCamTarget
    const tankCamPos = w.__tankCamPos
    if (!tankTarget || !tankCamPos) return
    currentTarget.current = 'tank'
    animateTo(tankCamPos, tankTarget, 2.5, onTankZoomIn)
  }, [animateTo, onTankZoomIn])

  const zoomOutFromTank = useCallback(() => {
    if (currentTarget.current !== 'tank') return
    currentTarget.current = 'none'
    animateTo(INITIAL_CAM_POS, ORBIT_TARGET, 2.0, onTankZoomOut, { target: ORBIT_TARGET })
  }, [animateTo, onTankZoomOut])

  // ── Couch zoom ──
  const zoomToCouch = useCallback(() => {
    if (currentTarget.current !== 'none') return
    const w = window as unknown as Record<string, [number, number, number]>
    const couchTarget = w.__couchCamTarget
    const couchCamPos = w.__couchCamPos
    if (!couchTarget || !couchCamPos) return
    currentTarget.current = 'couch'
    animateTo(couchCamPos, couchTarget, 2.5, onCouchZoomIn)
  }, [animateTo, onCouchZoomIn])

  const zoomOutFromCouch = useCallback(() => {
    if (currentTarget.current !== 'couch') return
    currentTarget.current = 'none'
    animateTo(INITIAL_CAM_POS, ORBIT_TARGET, 2.0, onCouchZoomOut, { target: ORBIT_TARGET })
  }, [animateTo, onCouchZoomOut])

  // ── PSP zoom (nested from couch view) ──
  const zoomToPSP = useCallback(() => {
    const w = window as unknown as Record<string, [number, number, number]>
    const pspTarget = w.__pspCamTarget
    const pspCamPos = w.__pspCamPos
    if (!pspTarget || !pspCamPos) return
    currentTarget.current = 'couch' // keep couch as the parent context
    animateTo(pspCamPos, pspTarget, 2.0, onPSPZoomIn)
  }, [animateTo, onPSPZoomIn])

  const zoomOutFromPSP = useCallback(() => {
    // Zoom back to couch overview, not to initial explore
    const w = window as unknown as Record<string, [number, number, number]>
    const couchTarget = w.__couchCamTarget
    const couchCamPos = w.__couchCamPos
    if (!couchTarget || !couchCamPos) return
    animateTo(couchCamPos, couchTarget, 2.0, onPSPZoomOut)
  }, [animateTo, onPSPZoomOut])

  // ── 3DS zoom (nested from couch view) ──
  const zoomTo3DS = useCallback(() => {
    const w = window as unknown as Record<string, [number, number, number]>
    const target = w.__n3dsCamTarget
    const camPos = w.__n3dsCamPos
    if (!target || !camPos) return
    currentTarget.current = 'couch'
    animateTo(camPos, target, 2.0, on3DSZoomIn)
  }, [animateTo, on3DSZoomIn])

  const zoomOutFrom3DS = useCallback(() => {
    const w = window as unknown as Record<string, [number, number, number]>
    const couchTarget = w.__couchCamTarget
    const couchCamPos = w.__couchCamPos
    if (!couchTarget || !couchCamPos) return
    animateTo(couchCamPos, couchTarget, 2.0, on3DSZoomOut)
  }, [animateTo, on3DSZoomOut])

  useEffect(() => {
    const w = window as unknown as Record<string, unknown>
    w.__zoomToScreen = zoomToScreen
    w.__zoomOutFromScreen = zoomOutFromScreen
    w.__zoomToTank = zoomToTank
    w.__zoomOutFromTank = zoomOutFromTank
    w.__zoomToCouch = zoomToCouch
    w.__zoomOutFromCouch = zoomOutFromCouch
    w.__zoomToPSP = zoomToPSP
    w.__zoomOutFromPSP = zoomOutFromPSP
    w.__zoomTo3DS = zoomTo3DS
    w.__zoomOutFrom3DS = zoomOutFrom3DS
    return () => {
      delete w.__zoomToScreen
      delete w.__zoomOutFromScreen
      delete w.__zoomToTank
      delete w.__zoomOutFromTank
      delete w.__zoomToCouch
      delete w.__zoomOutFromCouch
      delete w.__zoomToPSP
      delete w.__zoomOutFromPSP
      delete w.__zoomTo3DS
      delete w.__zoomOutFrom3DS
    }
  }, [zoomToScreen, zoomOutFromScreen, zoomToTank, zoomOutFromTank, zoomToCouch, zoomOutFromCouch, zoomToPSP, zoomOutFromPSP, zoomTo3DS, zoomOutFrom3DS])

  return null
}

function LoadingOverlay() {
  const { active, progress, loaded, total } = useProgress()
  const [dismissed, setDismissed] = useState(false)
  const [readyToEnter, setReadyToEnter] = useState(false)
  const mountedAtRef = useRef(typeof performance !== 'undefined' ? performance.now() : Date.now())

  useEffect(() => {
    if (active) {
      setDismissed(false)
      setReadyToEnter(false)
      return
    }

    if (total === 0) return

    const elapsed = (typeof performance !== 'undefined' ? performance.now() : Date.now()) - mountedAtRef.current
    const delay = Math.max(0, MIN_LOADING_SCREEN_MS - elapsed)

    const timer = window.setTimeout(() => {
      setReadyToEnter(true)
    }, delay)

    return () => window.clearTimeout(timer)
  }, [active, total])

  useEffect(() => {
    if (!readyToEnter || dismissed) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        setDismissed(true)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [readyToEnter, dismissed])

  if (dismissed) return null

  const roundedProgress = total > 0 ? Math.min(100, Math.round(progress)) : 0
  const statusLabel = active
    ? `Loading scene assets ${roundedProgress}%`
    : readyToEnter
      ? 'Scene ready. Press Enter or click to enter.'
      : 'Preparing scene'

  return (
    <div
      className={`loading-screen${readyToEnter ? ' loading-screen-ready' : ''}`}
      aria-live="polite"
      aria-label={statusLabel}
      onClick={readyToEnter ? () => setDismissed(true) : undefined}
    >
      <div className="loading-panel">
        <p className="loading-eyebrow">gavinzhu.com</p>
        <pre className="loading-ascii loading-ascii-name" aria-hidden="true">{NAME_ASCII}</pre>
        <div className="loading-terminal-line">
          <span className="loading-prompt">boot</span>
          <span className="loading-status-text">
            {active ? 'hydrating desk scene and terminal shell' : 'scene staged and waiting'}
          </span>
        </div>
        <div className="loading-bar" aria-hidden="true">
          <div
            className="loading-bar-fill"
            style={{ transform: `scaleX(${Math.max(0.08, roundedProgress / 100)})` }}
          />
        </div>
        <p className="loading-meta">
          {active
            ? `${loaded}/${total || '?'} assets • ${roundedProgress}%`
            : 'Click anywhere or press Enter to enter'}
        </p>
      </div>
    </div>
  )
}

type Phase = 'explore' | 'zooming' | 'focused' | 'menu' | 'tank-zooming' | 'tank-view' | 'couch-zooming' | 'couch-view' | 'couch-menu' | 'psp-zooming' | 'psp-view' | 'n3ds-zooming' | 'n3ds-view'

export default function Scene3D() {
  const [phase, setPhase] = useState<Phase>('explore')
  const [adaptiveFov, setAdaptiveFov] = useState(BASE_FOV)
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null)
  const screenPortalRef = useRef<HTMLDivElement>(null)
  const tankCamRef = useRef<{ target: [number, number, number]; camPos: [number, number, number] } | null>(null)
  const couchCamRef = useRef<{ target: [number, number, number]; camPos: [number, number, number] } | null>(null)

  const handleTankBounds = useCallback((center: THREE.Vector3, size: THREE.Vector3) => {
    // Place camera at a 45° angle from front-right, 1.2x the max dimension away
    const maxDim = Math.max(size.x, size.y, size.z)
    const dist = maxDim * 1.2
    const target: [number, number, number] = [center.x, center.y * 0.6, center.z]
    const camPos: [number, number, number] = [
      center.x + dist * 0.6,
      center.y + dist * 0.4,
      center.z + dist * 0.7,
    ]
    tankCamRef.current = { target, camPos }
    // Expose for CameraAnimator
    const w = window as unknown as Record<string, unknown>
    w.__tankCamTarget = target
    w.__tankCamPos = camPos
  }, [])

  const handleCouchBounds = useCallback((center: THREE.Vector3, size: THREE.Vector3) => {
    const maxDim = Math.max(size.x, size.y, size.z)
    const dist = maxDim * 0.25
    const target: [number, number, number] = [center.x, center.y + 0.3, center.z]
    const camPos: [number, number, number] = [
      center.x + dist * 0.4,
      center.y + dist * 0.6,
      center.z + dist * 0.9,
    ]
    couchCamRef.current = { target, camPos }
    const w = window as unknown as Record<string, unknown>
    w.__couchCamTarget = target
    w.__couchCamPos = camPos
  }, [])

  const handlePSPBounds = useCallback((center: THREE.Vector3, size: THREE.Vector3) => {
    const maxDim = Math.max(size.x, size.y, size.z)
    const dist = maxDim * 2.5
    const target: [number, number, number] = [center.x, center.y, center.z]
    const camPos: [number, number, number] = [
      center.x + dist * 0.3,
      center.y + dist * 0.5,
      center.z + dist * 0.8,
    ]
    const w = window as unknown as Record<string, unknown>
    w.__pspCamTarget = target
    w.__pspCamPos = camPos
  }, [])

  const handle3DSBounds = useCallback((center: THREE.Vector3, size: THREE.Vector3) => {
    const maxDim = Math.max(size.x, size.y, size.z)
    const dist = maxDim * 2.5
    const target: [number, number, number] = [center.x, center.y, center.z]
    const camPos: [number, number, number] = [
      center.x + dist * 0.3,
      center.y + dist * 0.5,
      center.z + dist * 0.8,
    ]
    const w = window as unknown as Record<string, unknown>
    w.__n3dsCamTarget = target
    w.__n3dsCamPos = camPos
  }, [])

  // Keep camera framing adaptive to viewport shape, but ignore keyboard-only viewport changes.
  useEffect(() => {
    const updateFov = () => {
      const vv = window.visualViewport
      const keyboardInset = vv ? Math.max(0, window.innerHeight - (vv.height + vv.offsetTop)) : 0
      if (keyboardInset > 80) return

      const width = window.innerWidth
      const height = window.innerHeight
      const nextFov = getAdaptiveFov(width / Math.max(height, 1))
      setAdaptiveFov((prev) => (Math.abs(prev - nextFov) < 0.01 ? prev : nextFov))
    }

    const onViewportChange = () => window.requestAnimationFrame(updateFov)

    updateFov()

    const viewport = window.visualViewport
    window.addEventListener('resize', onViewportChange)
    window.addEventListener('orientationchange', onViewportChange)
    viewport?.addEventListener('resize', onViewportChange)

    return () => {
      window.removeEventListener('resize', onViewportChange)
      window.removeEventListener('orientationchange', onViewportChange)
      viewport?.removeEventListener('resize', onViewportChange)
    }
  }, [])

  const handleEnter = () => {
    if (phase !== 'explore') return
    setPhase('zooming')

    const zoom = (window as unknown as Record<string, () => void>).__zoomToScreen
    if (zoom) zoom()
  }

  const handleZoomInComplete = useCallback(() => {
    setPhase('focused')
  }, [])

  const handleExit = useCallback(() => {
    if (phase !== 'focused') return
    setPhase('zooming')

    const zoomOut = (window as unknown as Record<string, () => void>).__zoomOutFromScreen
    if (zoomOut) zoomOut()
  }, [phase])

  const handleZoomOutComplete = useCallback(() => {
    setPhase('explore')
  }, [])

  // ── Tank handlers ──
  const handleLookAround = () => {
    if (phase !== 'explore') return
    setPhase('menu')
  }

  const handleMenuSelect = (destination: string) => {
    if (destination === 'tank') {
      setPhase('tank-zooming')
      const zoom = (window as unknown as Record<string, () => void>).__zoomToTank
      if (zoom) zoom()
    } else if (destination === 'couch') {
      setPhase('couch-zooming')
      const zoom = (window as unknown as Record<string, () => void>).__zoomToCouch
      if (zoom) zoom()
    }
  }

  const handleMenuBack = () => {
    setPhase('explore')
  }

  const handleTankZoomInComplete = useCallback(() => {
    setPhase('tank-view')
  }, [])

  const handleTankExit = useCallback(() => {
    if (phase !== 'tank-view') return
    setPhase('tank-zooming')
    const zoomOut = (window as unknown as Record<string, () => void>).__zoomOutFromTank
    if (zoomOut) zoomOut()
  }, [phase])

  const handleTankZoomOutComplete = useCallback(() => {
    setPhase('explore')
  }, [])

  const handleCouchZoomInComplete = useCallback(() => {
    setPhase('couch-view')
  }, [])

  const handleCouchExit = useCallback(() => {
    if (phase !== 'couch-view') return
    setPhase('couch-zooming')
    const zoomOut = (window as unknown as Record<string, () => void>).__zoomOutFromCouch
    if (zoomOut) zoomOut()
  }, [phase])

  const handleCouchZoomOutComplete = useCallback(() => {
    setPhase('explore')
  }, [])

  // ── Nested couch menu / PSP handlers ──
  const handleCouchLookAround = () => {
    if (phase !== 'couch-view') return
    setPhase('couch-menu')
  }

  const handleCouchMenuSelect = (destination: string) => {
    if (destination === 'psp') {
      setPhase('psp-zooming')
      const zoom = (window as unknown as Record<string, () => void>).__zoomToPSP
      if (zoom) zoom()
    } else if (destination === 'n3ds') {
      setPhase('n3ds-zooming')
      const zoom = (window as unknown as Record<string, () => void>).__zoomTo3DS
      if (zoom) zoom()
    }
  }

  const handleCouchMenuBack = () => {
    setPhase('couch-view')
  }

  const handlePSPZoomInComplete = useCallback(() => {
    setPhase('psp-view')
  }, [])

  const handlePSPExit = useCallback(() => {
    if (phase !== 'psp-view') return
    setPhase('psp-zooming')
    const zoomOut = (window as unknown as Record<string, () => void>).__zoomOutFromPSP
    if (zoomOut) zoomOut()
  }, [phase])

  const handlePSPZoomOutComplete = useCallback(() => {
    setPhase('couch-view')
  }, [])

  const handle3DSZoomInComplete = useCallback(() => {
    setPhase('n3ds-view')
  }, [])

  const handle3DSExit = useCallback(() => {
    if (phase !== 'n3ds-view') return
    setPhase('n3ds-zooming')
    const zoomOut = (window as unknown as Record<string, () => void>).__zoomOutFrom3DS
    if (zoomOut) zoomOut()
  }, [phase])

  const handle3DSZoomOutComplete = useCallback(() => {
    setPhase('couch-view')
  }, [])

  // ESC key listener
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (phase === 'focused') handleExit()
        else if (phase === 'tank-view') handleTankExit()
        else if (phase === 'couch-view') handleCouchExit()
        else if (phase === 'menu') handleMenuBack()
        else if (phase === 'psp-view') handlePSPExit()
        else if (phase === 'n3ds-view') handle3DSExit()
        else if (phase === 'couch-menu') handleCouchMenuBack()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleExit, handleTankExit, handleCouchExit, handlePSPExit, handle3DSExit, phase])

  return (
    <div className="scene-container">
      <LoadingOverlay />

      <main className="sr-only">
        <h1>Gavin Zhu (Guanjia Zhu)</h1>
        <p>
          Personal website of Gavin Zhu, also known as Guanjia Zhu, investor at Llama Ventures.
        </p>
        <p>
          Gavin Zhu studied at Duke University and UC San Diego, works in early-stage investing,
          and builds with AI, React, TypeScript, and product tooling.
        </p>
        <ul>
          <li><a href="https://www.linkedin.com/in/guanjiazhu/">LinkedIn</a></li>
          <li><a href="https://github.com/SoujiOkita98">GitHub</a></li>
          <li><a href="mailto:gavin@llamaventures.vc">gavin@llamaventures.vc</a></li>
        </ul>
      </main>

      {/* ── Screen portal layer ──
          HTML desktop (via drei Html + portal prop) renders here,
          BEHIND the transparent WebGL canvas. The canvas has a
          colorWrite:false "hole" where the screen is, so the HTML
          shows through. The 3D bezel naturally clips the edges. */}
      <div
        ref={screenPortalRef}
        className="screen-portal"
      />

      <Canvas
        camera={{ fov: adaptiveFov, near: 0.01, far: 100, position: [2.0, 1.8, 1.0] }}
        dpr={[1, 1.5]}
        shadows
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
        style={{ zIndex: 1, pointerEvents: phase === 'focused' ? 'none' : 'auto', cursor: (phase === 'tank-view' || phase === 'couch-view' || phase === 'psp-view' || phase === 'n3ds-view') ? 'grab' : undefined }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} color="#ffffff" />
        <directionalLight
          position={[3, 5, 2]}
          intensity={1.2}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-left={-6}
          shadow-camera-right={6}
          shadow-camera-top={6}
          shadow-camera-bottom={-6}
          shadow-bias={-0.0001}
        />
        <directionalLight position={[-2, 3, 4]} intensity={0.4} color="#f0f0ff" />
        <directionalLight position={[0, 2, -3]} intensity={0.3} color="#ffffff" />

        {/* Environment for metallic reflections (no CDN) */}
        <Suspense fallback={null}>
          <Environment resolution={256}>
            <Lightformer form="rect" intensity={1} position={[0, 5, -5]} scale={[10, 5, 1]} />
            <Lightformer
              form="rect"
              intensity={0.5}
              position={[-5, 3, 0]}
              scale={[5, 5, 1]}
              rotation={[0, Math.PI / 2, 0]}
            />
            <Lightformer form="circle" intensity={0.8} position={[5, 3, 0]} scale={3} />
          </Environment>
        </Suspense>

        {/* Soft contact shadows on floor */}
        <ContactShadows
          position={[0, 0.001, -1.6]}
          opacity={0.4}
          scale={30}
          blur={2.5}
          far={10}
          resolution={256}
          color="#000000"
        />

        {/* Studio floor */}
        <StudioEnvironment />

        {/* Desk group */}
        <group position={[0, 0, -1.6]}>
          <DeskSetup />
          <MacBookModel
            position={MACBOOK_POS}
            screenPortal={screenPortalRef}
            phase={phase}
          />
          <PlantModel position={[0.6, 0.74, -0.15]} />
          <CoffeeMug position={[-0.55, 0.74, 0.1]} />
          <BookStack position={[0.65, 0.742, 0.15]} />
          <StationWagon position={[-0.55, 0.742, -0.15]} />
        </group>

        {/* Siege Tank */}
        <SiegeTankModel
          position={TANK_POSITION}
          rotation={TANK_ROTATION}
          shouldSiege={phase === 'tank-view'}
          onBoundsReady={handleTankBounds}
        />
        {/* Tank lighting */}
        <pointLight
          position={[-3, 8, -6]}
          intensity={8}
          distance={20}
          color="#ffffff"
        />

        {/* Couch gaming scene */}
        <CouchScene
          position={COUCH_POSITION}
          rotation={COUCH_ROTATION}
          onBoundsReady={handleCouchBounds}
          onPSPBoundsReady={handlePSPBounds}
          on3DSBoundsReady={handle3DSBounds}
        />
        {/* Couch area warm lighting */}
        <pointLight
          position={[-2.5, 2, 0]}
          intensity={5}
          distance={8}
          color="#ffe4b5"
        />

        <OrbitControls
          ref={controlsRef}
          target={[0, 0.9, -1.4]}
          enablePan={false}
          enableZoom={true}
          minDistance={0.3}
          maxDistance={50}
          minPolarAngle={Math.PI * 0.05}
          maxPolarAngle={Math.PI * 0.48}
          enableDamping
          dampingFactor={0.05}
        />

        <CameraAnimator
          controlsRef={controlsRef}
          onZoomIn={handleZoomInComplete}
          onZoomOut={handleZoomOutComplete}
          onTankZoomIn={handleTankZoomInComplete}
          onTankZoomOut={handleTankZoomOutComplete}
          onCouchZoomIn={handleCouchZoomInComplete}
          onCouchZoomOut={handleCouchZoomOutComplete}
          onPSPZoomIn={handlePSPZoomInComplete}
          onPSPZoomOut={handlePSPZoomOutComplete}
          on3DSZoomIn={handle3DSZoomInComplete}
          on3DSZoomOut={handle3DSZoomOutComplete}
        />
      </Canvas>

      {/* Action buttons */}
      {phase === 'explore' && (
        <div className="action-buttons">
          <button className="enter-button" onClick={handleEnter}>
            <span className="enter-button-text" data-text="Go to Desk">Go to Desk</span>
          </button>
          <button className="enter-button look-around-button" onClick={handleLookAround}>
            <span className="enter-button-text" data-text="Look around">Look around</span>
          </button>
        </div>
      )}

      {/* Destination menu */}
      {phase === 'menu' && (
        <div className="action-buttons">
          <button className="enter-button" onClick={() => handleMenuSelect('tank')}>
            <span className="enter-button-text" data-text="Siege Tank">Siege Tank</span>
          </button>
          <button className="enter-button" onClick={() => handleMenuSelect('couch')}>
            <span className="enter-button-text" data-text="Gaming Corner">Gaming Corner</span>
          </button>
          <button className="enter-button look-around-button" onClick={handleMenuBack}>
            <span className="enter-button-text" data-text="← Back">← Back</span>
          </button>
        </div>
      )}

      {/* Fade out during zoom */}
      {(phase === 'zooming' || phase === 'tank-zooming' || phase === 'couch-zooming') && (
        <div className="action-buttons fade-out">
          <button className="enter-button">
            <span className="enter-button-text" data-text="Go to Desk">Go to Desk</span>
          </button>
          <button className="enter-button look-around-button">
            <span className="enter-button-text" data-text="Look around">Look around</span>
          </button>
        </div>
      )}

      {/* Back button — return to starting view */}
      {(phase === 'focused' || phase === 'tank-view' || phase === 'couch-view' || phase === 'psp-view' || phase === 'n3ds-view') && (
        <button
          className="back-button"
          onClick={
            phase === 'focused' ? handleExit
            : phase === 'tank-view' ? handleTankExit
            : phase === 'psp-view' ? handlePSPExit
            : phase === 'n3ds-view' ? handle3DSExit
            : handleCouchExit
          }
        >
          ← Back
        </button>
      )}

      {/* Exhibit description card */}
      {phase === 'tank-view' && (
        <div className="exhibit-card">
          <h2 className="exhibit-title">Siege Tank</h2>
          <p className="exhibit-desc">
            StarCraft 2 is one of my all-time favorite games. I&apos;m a Terran main, and the Siege Tank
            is hands down my favorite unit — nothing beats that satisfying <em>thunk</em> when it locks
            into siege mode and starts raining shells. GG no re.
          </p>
          <span className="exhibit-credit">
            Model by <a href="https://skfb.ly/oXJGR" target="_blank" rel="noopener noreferrer">Catholomew</a> · CC BY-NC 4.0
          </span>
        </div>
      )}

      {/* Couch view — nested Look Around */}
      {phase === 'couch-view' && (
        <div className="action-buttons" style={{ bottom: '6%' }}>
          <button className="enter-button look-around-button" onClick={handleCouchLookAround}>
            <span className="enter-button-text" data-text="Look around the Gaming Corner">Look around the Gaming Corner</span>
          </button>
        </div>
      )}

      {/* Couch sub-menu */}
      {phase === 'couch-menu' && (
        <div className="action-buttons">
          <button className="enter-button" onClick={() => handleCouchMenuSelect('psp')}>
            <span className="enter-button-text" data-text="Sony PSP">Sony PSP</span>
          </button>
          <button className="enter-button" onClick={() => handleCouchMenuSelect('n3ds')}>
            <span className="enter-button-text" data-text="Nintendo 3DS XL">Nintendo 3DS XL</span>
          </button>
          <button className="enter-button look-around-button" onClick={handleCouchMenuBack}>
            <span className="enter-button-text" data-text="← Back">← Back</span>
          </button>
        </div>
      )}

      {/* PSP exhibit card */}
      {phase === 'psp-view' && (
        <div className="exhibit-card">
          <h2 className="exhibit-title">Sony PSP</h2>
          <p className="exhibit-desc">
            This thing was my <em>childhood</em>. Spent countless hours on GTA Vice City Stories and
            Monster Hunter 2G / 3rd Portable — Hammer and Bow main, the grind was real.
            Oh, and of course it was jailbroken — shoutout
            to the <em>Patapon save exploit</em> that made it all possible. Good times.
          </p>
          <span className="exhibit-credit">
            Model by <a href="https://skfb.ly/6CXrr" target="_blank" rel="noopener noreferrer">Ilya Ostrovsky</a> · CC BY 4.0
          </span>
        </div>
      )}

      {/* 3DS exhibit card */}
      {phase === 'n3ds-view' && (
        <div className="exhibit-card">
          <h2 className="exhibit-title">Nintendo 3DS XL</h2>
          <p className="exhibit-desc">
            Another Monster Hunter machine. Sunk <em>hundreds</em> of hours into MH4U and
            MH Generations on this thing. The funny part? I had the 3D slider turned off the
            <em> entire time</em> I owned it — never liked the 3D effect. Just give me the
            gameplay.
          </p>
          <span className="exhibit-credit">
            Model by <a href="https://skfb.ly/o6xpZ" target="_blank" rel="noopener noreferrer">Keita-sama</a> · CC BY 4.0
          </span>
        </div>
      )}

    </div>
  )
}
