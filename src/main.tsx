import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Blog from './pages/Blog'
import { SceneLoadBoundary } from './components/SceneLoadBoundary'
import { clearSceneRetryMarker, markSceneRetry } from './sceneRetry'

const Scene3D = lazy(async () => {
  try {
    const sceneModule = await import('./Scene3D')
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <SceneLoadBoundary>
              <Suspense fallback={null}>
                <Scene3D />
              </Suspense>
            </SceneLoadBoundary>
          }
        />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/*" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
