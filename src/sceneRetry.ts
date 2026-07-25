const SCENE_RETRY_KEY = 'gavinzhu:scene-load-retry'

export function clearSceneRetryMarker() {
  try {
    window.sessionStorage.removeItem(SCENE_RETRY_KEY)
  } catch {
    // Storage can be unavailable in privacy-restricted webviews.
  }
}

export function markSceneRetry(): boolean {
  try {
    if (window.sessionStorage.getItem(SCENE_RETRY_KEY) === '1') return false
    window.sessionStorage.setItem(SCENE_RETRY_KEY, '1')
    return true
  } catch {
    return false
  }
}
