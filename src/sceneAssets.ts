import { useEffect, useState } from 'react'

const SCENE_ASSETS = {
  macbook: {
    url: '/models/macbook_pro_m3.glb?v=9e5177f8',
    bytes: 9_755_508,
  },
  tank: {
    url: '/models/siege_tank.glb?v=3f0a0019',
    bytes: 6_668_732,
  },
  psp: {
    url: '/models/sony_psp.glb?v=a9d7013b',
    bytes: 1_684_104,
  },
  nintendo3DS: {
    url: '/models/nintendo_3ds_xl.glb?v=bf977fc5',
    bytes: 602_224,
  },
  wallpaper: {
    url: '/wallpaper.webp?v=9308238a',
    bytes: 59_306,
  },
} as const

type SceneAssetKey = keyof typeof SCENE_ASSETS
type SceneAssetDefinition = (typeof SCENE_ASSETS)[SceneAssetKey]

export type SceneAssetUrls = Record<SceneAssetKey, string>

export interface SceneAssetDownload {
  assetUrls: SceneAssetUrls | null
  loadedBytes: number
  totalBytes: number
}

const assetEntries = Object.entries(SCENE_ASSETS) as [
  SceneAssetKey,
  SceneAssetDefinition,
][]
const totalBytes = assetEntries.reduce((sum, [, asset]) => sum + asset.bytes, 0)

const INITIAL_DOWNLOAD: SceneAssetDownload = {
  assetUrls: null,
  loadedBytes: 0,
  totalBytes,
}

export function useSceneAssetDownload(): SceneAssetDownload {
  const [download, setDownload] = useState<SceneAssetDownload>(INITIAL_DOWNLOAD)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false
    let progressFrame: number | null = null
    const loadedByAsset = new Map<SceneAssetKey, number>()
    const requests: XMLHttpRequest[] = []
    const objectUrls: string[] = []

    const publishProgress = () => {
      if (progressFrame !== null) return

      progressFrame = window.requestAnimationFrame(() => {
        progressFrame = null
        if (cancelled) return

        const loadedBytes = [...loadedByAsset.values()].reduce(
          (sum, loaded) => sum + loaded,
          0,
        )
        setDownload((current) => ({ ...current, loadedBytes }))
      })
    }

    const loadAsset = (
      key: SceneAssetKey,
      asset: SceneAssetDefinition,
    ): Promise<[SceneAssetKey, string]> =>
      new Promise((resolve, reject) => {
        const request = new XMLHttpRequest()
        requests.push(request)
        request.open('GET', asset.url)
        request.responseType = 'blob'

        request.onprogress = (event) => {
          loadedByAsset.set(key, Math.min(event.loaded, asset.bytes))
          publishProgress()
        }

        request.onerror = () => {
          reject(new Error(`Could not download ${asset.url}.`))
        }

        request.onabort = () => {
          reject(new Error(`Download cancelled for ${asset.url}.`))
        }

        request.onload = () => {
          if (request.status < 200 || request.status >= 300) {
            reject(new Error(`Could not download ${asset.url} (${request.status}).`))
            return
          }

          const blob = request.response as Blob
          if (!(blob instanceof Blob) || blob.size !== asset.bytes) {
            reject(
              new Error(
                `Incomplete download for ${asset.url}: expected ${asset.bytes} bytes, received ${blob?.size ?? 0}.`,
              ),
            )
            return
          }

          loadedByAsset.set(key, asset.bytes)
          publishProgress()

          const objectUrl = URL.createObjectURL(blob)
          objectUrls.push(objectUrl)
          resolve([key, objectUrl])
        }

        request.send()
      })

    Promise.all(assetEntries.map(([key, asset]) => loadAsset(key, asset)))
      .then((entries) => {
        if (cancelled) return
        setDownload({
          assetUrls: Object.fromEntries(entries) as SceneAssetUrls,
          loadedBytes: totalBytes,
          totalBytes,
        })
      })
      .catch((reason: unknown) => {
        requests.forEach((request) => request.abort())
        if (!cancelled) {
          setError(reason instanceof Error ? reason : new Error('Scene download failed.'))
        }
      })

    return () => {
      cancelled = true
      requests.forEach((request) => request.abort())
      objectUrls.forEach((objectUrl) => URL.revokeObjectURL(objectUrl))
      if (progressFrame !== null) window.cancelAnimationFrame(progressFrame)
    }
  }, [])

  if (error) throw error
  return download
}
