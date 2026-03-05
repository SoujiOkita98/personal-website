import { useRef, useState, useCallback, useEffect, Suspense } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Lightformer } from '@react-three/drei'
import gsap from 'gsap'
import MacBookModel from './components/MacBookModel'
import StudioEnvironment from './components/StudioEnvironment'
import DeskSetup from './components/DeskSetup'
import PlantModel from './components/PlantModel'
import { CoffeeMug, BookStack, StationWagon } from './components/DeskProps'
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

function CameraAnimator({
  controlsRef,
  onZoomIn,
  onZoomOut,
}: {
  controlsRef: React.RefObject<React.ComponentRef<typeof OrbitControls> | null>
  onZoomIn: () => void
  onZoomOut: () => void
}) {
  const { camera } = useThree()
  const hasRun = useRef(false)

  const zoomIn = useCallback(() => {
    if (hasRun.current) return
    hasRun.current = true

    // Disable controls during animation so they don't fight gsap
    if (controlsRef.current) controlsRef.current.enabled = false

    gsap.to(camera.position, {
      x: SCREEN_TARGET[0],
      y: SCREEN_TARGET[1],
      z: SCREEN_TARGET[2] + 0.8,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        camera.lookAt(SCREEN_TARGET[0], SCREEN_TARGET[1], SCREEN_TARGET[2])
        camera.updateProjectionMatrix()
      },
      onComplete: () => {
        camera.lookAt(SCREEN_TARGET[0], SCREEN_TARGET[1], SCREEN_TARGET[2])
        camera.updateProjectionMatrix()
        // Re-enable controls with new target centered on screen
        if (controlsRef.current) {
          controlsRef.current.target.set(SCREEN_TARGET[0], SCREEN_TARGET[1], SCREEN_TARGET[2])
          controlsRef.current.enabled = true
        }
        onZoomIn()
      },
    })
  }, [camera, controlsRef, onZoomIn])

  const zoomOut = useCallback(() => {
    if (!hasRun.current) return
    hasRun.current = false

    if (controlsRef.current) controlsRef.current.enabled = false

    gsap.to(camera.position, {
      x: INITIAL_CAM_POS[0],
      y: INITIAL_CAM_POS[1],
      z: INITIAL_CAM_POS[2],
      duration: 2.0,
      ease: 'power2.inOut',
      onUpdate: () => {
        camera.lookAt(ORBIT_TARGET[0], ORBIT_TARGET[1], ORBIT_TARGET[2])
        camera.updateProjectionMatrix()
      },
      onComplete: () => {
        camera.lookAt(ORBIT_TARGET[0], ORBIT_TARGET[1], ORBIT_TARGET[2])
        camera.updateProjectionMatrix()
        // Restore original orbit target
        if (controlsRef.current) {
          controlsRef.current.target.set(ORBIT_TARGET[0], ORBIT_TARGET[1], ORBIT_TARGET[2])
          controlsRef.current.enabled = true
        }
        onZoomOut()
      },
    })
  }, [camera, controlsRef, onZoomOut])

  useEffect(() => {
    const w = window as unknown as Record<string, unknown>
    w.__zoomToScreen = zoomIn
    w.__zoomOutFromScreen = zoomOut
    return () => {
      delete w.__zoomToScreen
      delete w.__zoomOutFromScreen
    }
  }, [zoomIn, zoomOut])

  return null
}

export default function Scene3D() {
  const [phase, setPhase] = useState<'explore' | 'zooming' | 'focused'>('explore')
  const [adaptiveFov, setAdaptiveFov] = useState(BASE_FOV)
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null)
  const screenPortalRef = useRef<HTMLDivElement>(null)

  // Keep CSS in sync with the visual viewport, especially during keyboard open/close.
  useEffect(() => {
    const root = document.documentElement
    const updateViewportVars = () => {
      const vv = window.visualViewport
      const width = vv ? vv.width : window.innerWidth
      const height = vv ? vv.height : window.innerHeight
      const offsetTop = vv ? vv.offsetTop : 0
      const offsetLeft = vv ? vv.offsetLeft : 0
      const keyboardInset = vv
        ? Math.max(0, window.innerHeight - (vv.height + vv.offsetTop))
        : 0

      root.style.setProperty('--visual-viewport-width', `${Math.round(width)}px`)
      root.style.setProperty('--visual-viewport-height', `${Math.round(height)}px`)
      root.style.setProperty('--visual-viewport-offset-top', `${Math.round(offsetTop)}px`)
      root.style.setProperty('--visual-viewport-offset-left', `${Math.round(offsetLeft)}px`)
      root.style.setProperty('--keyboard-inset', `${Math.round(keyboardInset)}px`)

      const nextFov = getAdaptiveFov(width / Math.max(height, 1))
      setAdaptiveFov((prev) => (Math.abs(prev - nextFov) < 0.01 ? prev : nextFov))
    }

    const onViewportChange = () => {
      window.requestAnimationFrame(updateViewportVars)
    }

    updateViewportVars()

    const viewport = window.visualViewport
    window.addEventListener('resize', onViewportChange)
    window.addEventListener('orientationchange', onViewportChange)
    viewport?.addEventListener('resize', onViewportChange)
    viewport?.addEventListener('scroll', onViewportChange)

    return () => {
      window.removeEventListener('resize', onViewportChange)
      window.removeEventListener('orientationchange', onViewportChange)
      viewport?.removeEventListener('resize', onViewportChange)
      viewport?.removeEventListener('scroll', onViewportChange)
    }
  }, [])

  // Prevent browser pinch-zoom so scene scale always comes from Three.js camera math.
  useEffect(() => {
    const preventMultiTouchZoom = (event: TouchEvent) => {
      if (event.touches.length > 1) event.preventDefault()
    }
    const preventCtrlWheelZoom = (event: WheelEvent) => {
      if (event.ctrlKey) event.preventDefault()
    }

    document.addEventListener('touchmove', preventMultiTouchZoom, { passive: false })
    window.addEventListener('wheel', preventCtrlWheelZoom, { passive: false })

    return () => {
      document.removeEventListener('touchmove', preventMultiTouchZoom)
      window.removeEventListener('wheel', preventCtrlWheelZoom)
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

  // ESC key listener
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleExit()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleExit])

  return (
    <div className="scene-container">
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
        dpr={[1, 2]}
        shadows
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
        style={{ zIndex: 1, pointerEvents: phase === 'focused' ? 'none' : 'auto' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} color="#ffffff" />
        <directionalLight
          position={[3, 5, 2]}
          intensity={1.2}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-left={-3}
          shadow-camera-right={3}
          shadow-camera-top={3}
          shadow-camera-bottom={-3}
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
          scale={10}
          blur={2.5}
          far={4}
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

        <OrbitControls
          ref={controlsRef}
          target={[0, 0.9, -1.4]}
          enablePan={false}
          enableZoom={true}
          minDistance={0.3}
          maxDistance={5.0}
          minPolarAngle={Math.PI * 0.05}
          maxPolarAngle={Math.PI * 0.48}
          enableDamping
          dampingFactor={0.05}
        />

        <CameraAnimator
          controlsRef={controlsRef}
          onZoomIn={handleZoomInComplete}
          onZoomOut={handleZoomOutComplete}
        />
      </Canvas>

      {/* Enter button */}
      {phase === 'explore' && (
        <button className="enter-button" onClick={handleEnter}>
          Enter
        </button>
      )}

      {/* Fade out during zoom */}
      {phase === 'zooming' && (
        <button className="enter-button fade-out">
          Enter
        </button>
      )}

      {/* Back button — return to starting view */}
      {phase === 'focused' && (
        <button className="back-button" onClick={handleExit}>
          ← Back
        </button>
      )}

    </div>
  )
}
