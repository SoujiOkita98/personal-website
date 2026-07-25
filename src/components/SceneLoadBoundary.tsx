import type { ReactNode } from 'react'
import { Component } from 'react'

import { clearSceneRetryMarker } from '../sceneRetry'

export function SceneLoadError() {
  const retry = () => {
    clearSceneRetryMarker()
    window.location.reload()
  }

  return (
    <main className="scene-load-error" role="alert">
      <p>The interactive scene could not start.</p>
      <div className="scene-load-error-actions">
        <button type="button" onClick={retry}>
          Try again
        </button>
        <a href="/blog">Open the blog</a>
      </div>
    </main>
  )
}

interface SceneLoadBoundaryProps {
  children: ReactNode
}

interface SceneLoadBoundaryState {
  failed: boolean
}

export class SceneLoadBoundary extends Component<
  SceneLoadBoundaryProps,
  SceneLoadBoundaryState
> {
  state: SceneLoadBoundaryState = { failed: false }

  static getDerivedStateFromError(): SceneLoadBoundaryState {
    return { failed: true }
  }

  componentDidCatch(error: unknown) {
    console.error('Interactive scene failed to load', error)
  }

  render() {
    if (this.state.failed) return <SceneLoadError />
    return this.props.children
  }
}
