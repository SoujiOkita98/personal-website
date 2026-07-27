import { lazy, Suspense, useCallback, useState } from 'react'

import { clearSceneRetryMarker, markSceneRetry } from '../sceneRetry'
import { useSceneAssetDownload } from '../sceneAssets'
import SceneLoadingOverlay from './SceneLoadingOverlay'
import type { SceneLoadState } from './SceneLoadingOverlay'

const sceneModulePromise = (async () => {
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
})()
const Scene3D = lazy(() => sceneModulePromise)

const INITIAL_LOAD_STATE: SceneLoadState = {
  active: false,
  loaded: 0,
  total: 0,
}

export default function HomeScene() {
  const { assetUrls, loadedBytes, totalBytes } = useSceneAssetDownload()
  const [loadState, setLoadState] = useState<SceneLoadState>(INITIAL_LOAD_STATE)
  const [firstFrameRendered, setFirstFrameRendered] = useState(false)
  const handleFirstFrame = useCallback(() => setFirstFrameRendered(true), [])
  const sceneReady =
    assetUrls !== null && firstFrameRendered && loadState.total > 0 && !loadState.active

  return (
    <>
      <SceneLoadingOverlay
        downloadComplete={assetUrls !== null}
        loadedBytes={loadedBytes}
        totalBytes={totalBytes}
        sceneReady={sceneReady}
      />
      {assetUrls && (
        <Suspense fallback={null}>
          <Scene3D
            assetUrls={assetUrls}
            onLoadStateChange={setLoadState}
            onFirstFrame={handleFirstFrame}
          />
        </Suspense>
      )}
    </>
  )
}
