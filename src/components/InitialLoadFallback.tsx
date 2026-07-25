import type { ReactNode } from 'react'
import { Component } from 'react'

import { clearSceneRetryMarker } from '../sceneRetry'

export function InitialLoadFallback({
  failed = false,
}: {
  failed?: boolean
}) {
  const retry = () => {
    clearSceneRetryMarker()
    window.location.reload()
  }

  return (
    <main
      className={`initial-shell${failed ? ' initial-shell-failed' : ''}`}
      aria-live="polite"
      aria-busy={!failed}
    >
      <div className="initial-shell-panel">
        <p className="initial-shell-domain">gavinzhu.com</p>
        <h1 className="initial-shell-name">Gavin Zhu</h1>
        <div className="initial-shell-status">
          <span className="initial-shell-indicator" aria-hidden="true" />
          <span>
            {failed
              ? 'The interactive scene could not start.'
              : 'Starting the interactive desk…'}
          </span>
        </div>
        {failed ? (
          <div className="initial-shell-actions">
            <button type="button" className="initial-shell-retry" onClick={retry}>
              Try again
            </button>
            <a className="initial-shell-blog-link" href="/blog">
              Open the blog
            </a>
          </div>
        ) : (
          <a className="initial-shell-blog-link" href="/blog">
            Continue to the blog
          </a>
        )}
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
    if (this.state.failed) return <InitialLoadFallback failed />
    return this.props.children
  }
}
