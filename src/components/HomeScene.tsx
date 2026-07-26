import { lazy, Suspense, useCallback, useState } from 'react'

import { clearSceneRetryMarker, markSceneRetry } from '../sceneRetry'
import SceneLoadingOverlay from './SceneLoadingOverlay'
import type { SceneLoadState } from './SceneLoadingOverlay'

const Scene3D = lazy(async () => {
  try {
    const sceneModule = await import('../Scene3D')
    clearSceneRetryMarker()
    return sceneModule
  } catch (error) {
    // A first-load chunk request can fail transiently in an in-app browser.
    // Reload once automatically; a second failure is handled by the visible
    // error boundary instead of leaving the root empty.
    if (markSceneRetry()) {
      window.location.reload()
      return new Promise<never>(() => {})
    }
    throw error
  }
})

const INITIAL_LOAD_STATE: SceneLoadState = {
  active: false,
  progress: 0,
  loaded: 0,
  total: 0,
}

export default function HomeScene() {
  const [loadState, setLoadState] = useState<SceneLoadState>(INITIAL_LOAD_STATE)
  const [firstFrameRendered, setFirstFrameRendered] = useState(false)
  const handleFirstFrame = useCallback(() => setFirstFrameRendered(true), [])
  const sceneReady =
    firstFrameRendered && loadState.total > 0 && !loadState.active

  return (
    <>
      <SceneLoadingOverlay loadState={loadState} sceneReady={sceneReady} />
      <Suspense fallback={null}>
        <Scene3D
          onLoadStateChange={setLoadState}
          onFirstFrame={handleFirstFrame}
        />
      </Suspense>
    </>
  )
}
