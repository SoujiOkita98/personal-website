import { useCallback, useEffect, useRef, useState } from 'react'

import '../loading.css'

const MIN_LOADING_SCREEN_MS = 800
const EXIT_TRANSITION_MS = 240
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

export interface SceneLoadState {
  active: boolean
  progress: number
  loaded: number
  total: number
}

interface SceneLoadingOverlayProps {
  loadState: SceneLoadState
  sceneReady: boolean
}

export default function SceneLoadingOverlay({
  loadState,
  sceneReady,
}: SceneLoadingOverlayProps) {
  const [readyToEnter, setReadyToEnter] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const mountedAtRef = useRef(0)
  const canDismiss = readyToEnter && sceneReady

  useEffect(() => {
    mountedAtRef.current = performance.now()
  }, [])

  useEffect(() => {
    if (!sceneReady || dismissed) return

    const elapsed = performance.now() - mountedAtRef.current
    const delay = Math.max(0, MIN_LOADING_SCREEN_MS - elapsed)
    const timer = window.setTimeout(() => setReadyToEnter(true), delay)

    return () => window.clearTimeout(timer)
  }, [dismissed, sceneReady])

  useEffect(() => {
    if (!exiting) return

    const timer = window.setTimeout(() => setDismissed(true), EXIT_TRANSITION_MS)
    return () => window.clearTimeout(timer)
  }, [exiting])

  const dismiss = useCallback(() => {
    if (!canDismiss || dismissed || exiting) return
    setExiting(true)
  }, [canDismiss, dismissed, exiting])

  useEffect(() => {
    if (!canDismiss || dismissed) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        dismiss()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [canDismiss, dismiss, dismissed])

  if (dismissed) return null

  const roundedProgress =
    loadState.total > 0 ? Math.min(100, Math.round(loadState.progress)) : 0
  const statusLabel = sceneReady
    ? 'Scene ready. Press Enter or click to enter.'
    : loadState.active
      ? `Loading scene assets ${roundedProgress}%`
      : 'Preparing scene'

  return (
    <div
      className={[
        'loading-screen',
        canDismiss ? 'loading-screen-ready' : '',
        exiting ? 'loading-screen-exiting' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-live="polite"
      aria-label={statusLabel}
      onClick={canDismiss ? dismiss : undefined}
    >
      <div className="loading-panel">
        <p className="loading-eyebrow">gavinzhu.com</p>
        <pre className="loading-ascii loading-ascii-name" aria-hidden="true">
          {NAME_ASCII}
        </pre>
        <div className="loading-terminal-line">
          <span className="loading-prompt">boot</span>
          <span className="loading-status-text">
            {sceneReady ? 'scene staged and waiting' : 'hydrating desk scene and terminal shell'}
          </span>
        </div>
        <div className="loading-bar" aria-hidden="true">
          <div
            className="loading-bar-fill"
            style={{ transform: `scaleX(${Math.max(0.08, roundedProgress / 100)})` }}
          />
        </div>
        <p className="loading-meta">
          {sceneReady
            ? 'Click anywhere or press Enter to enter'
            : `${loadState.loaded}/${loadState.total || '?'} assets • ${roundedProgress}%`}
        </p>
        <a href="/blog" className="loading-blog-link" onClick={(event) => event.stopPropagation()}>
          or go straight to my blog → /blog
        </a>
      </div>
    </div>
  )
}
