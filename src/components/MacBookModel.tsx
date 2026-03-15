import { useEffect, useRef, useState, useMemo } from 'react'
import type { RefObject } from 'react'
import * as THREE from 'three'
import { useGLTF, Html, useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import App from '../App'

interface MacBookModelProps {
  position?: [number, number, number]
  screenPortal?: RefObject<HTMLDivElement | null>
  phase?: 'explore' | 'zooming' | 'focused'
}

// Scale: model is ~35.5 units wide, we want ~0.70 scene units
const MODEL_SCALE = 0.02

// Meshes that must become transparent "holes" for the occlusion technique.
const SCREEN_HOLE_MESHES = new Set(['Object_123', 'Object_129'])

export default function MacBookModel({
  position = [0, 0, 0],
  screenPortal,
  phase = 'explore',
}: MacBookModelProps) {
  const { scene } = useGLTF('/models/macbook_pro_m3.glb', false, true)
  const groupRef = useRef<THREE.Group>(null)
  const { camera, size } = useThree()

  // World-space vertices of the glass panel — used for per-frame clip-path
  const screenWorldVerts = useRef<THREE.Vector3[]>([])

  // Store references to hole meshes + their original materials
  const holeMeshesRef = useRef<{ mesh: THREE.Mesh; origMat: THREE.Material }[]>([])
  const screenMeshRef = useRef<THREE.Mesh | null>(null)
  const holeMat = useRef(new THREE.MeshBasicMaterial({ colorWrite: false }))

  // Load wallpaper texture for the static screen preview
  const wallpaperTex = useTexture('/wallpaper.jpg')
  const screenPreviewMat = useMemo(() => {
    wallpaperTex.colorSpace = THREE.SRGBColorSpace
    return new THREE.MeshBasicMaterial({ map: wallpaperTex })
  }, [wallpaperTex])

  const [screenData, setScreenData] = useState<{
    localPos: [number, number, number]
    rotation: [number, number, number]
    screenWidthScene: number
  } | null>(null)

  // ── Initial scene setup: find meshes, extract vertices, compute Html position ──
  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      let screenMesh: THREE.Mesh | null = null
      let glassMesh: THREE.Mesh | null = null
      const holeEntries: { mesh: THREE.Mesh; origMat: THREE.Material }[] = []

      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true
          child.receiveShadow = true

          const mat = child.material as THREE.MeshStandardMaterial

          // Detect the emissive screen mesh
          if (
            mat &&
            mat.emissiveIntensity > 0 &&
            mat.emissive &&
            mat.emissive.r > 0.9 &&
            mat.emissive.g > 0.9 &&
            mat.emissive.b > 0.9
          ) {
            screenMesh = child
          }

          // Capture the glass panel mesh
          if (child.name === 'Object_129') {
            glassMesh = child
          }

          // Store hole meshes with their original materials (don't apply hole yet)
          if (SCREEN_HOLE_MESHES.has(child.name)) {
            holeEntries.push({ mesh: child, origMat: child.material as THREE.Material })
          }

          if (child.name === 'Object_127') {
            child.visible = false
          }
        }
      })

      holeMeshesRef.current = holeEntries
      screenMeshRef.current = screenMesh

      // Apply wallpaper texture to screen mesh so it looks like a desktop during explore
      const sMesh = screenMesh as THREE.Mesh | null
      if (sMesh) {
        sMesh.material = screenPreviewMat
      }

      // Extract glass panel vertices for clip-path
      const clipSource = glassMesh || screenMesh
      if (clipSource && groupRef.current) {
        const clipMesh = clipSource as THREE.Mesh
        const posAttr = clipMesh.geometry.getAttribute('position')
        clipMesh.updateWorldMatrix(true, false)
        const verts: THREE.Vector3[] = []
        for (let i = 0; i < posAttr.count; i++) {
          verts.push(
            new THREE.Vector3(
              posAttr.getX(i),
              posAttr.getY(i),
              posAttr.getZ(i)
            ).applyMatrix4(clipMesh.matrixWorld)
          )
        }
        screenWorldVerts.current = verts
      }

      // Compute Html position from glass panel
      const posMesh = (glassMesh || screenMesh) as THREE.Mesh | null
      if (posMesh && groupRef.current) {
        posMesh.geometry.computeBoundingBox()
        const box = posMesh.geometry.boundingBox!
        const geomCenter = new THREE.Vector3()
        box.getCenter(geomCenter)
        const geomSize = new THREE.Vector3()
        box.getSize(geomSize)

        const worldCenter = geomCenter.clone().applyMatrix4(posMesh.matrixWorld)

        groupRef.current.updateWorldMatrix(true, false)
        const invGroup = new THREE.Matrix4()
          .copy(groupRef.current.matrixWorld)
          .invert()
        const localCenter = worldCenter.applyMatrix4(invGroup)

        posMesh.geometry.computeVertexNormals()
        const normalAttr = posMesh.geometry.getAttribute('normal')
        const geomNormal = new THREE.Vector3(
          normalAttr.getX(0),
          normalAttr.getY(0),
          normalAttr.getZ(0)
        )
        const normalMat = new THREE.Matrix3().getNormalMatrix(posMesh.matrixWorld)
        const worldNormal = geomNormal.applyMatrix3(normalMat).normalize()

        const quat = new THREE.Quaternion()
        quat.setFromUnitVectors(new THREE.Vector3(0, 0, 1), worldNormal)
        const euler = new THREE.Euler().setFromQuaternion(quat)

        const dims = [geomSize.x, geomSize.y, geomSize.z].sort(
          (a, b) => b - a
        )
        const screenWidthScene = dims[0] * MODEL_SCALE

        setScreenData({
          localPos: [localCenter.x, localCenter.y, localCenter.z],
          rotation: [euler.x, euler.y, euler.z],
          screenWidthScene,
        })
      }
    })

    return () => cancelAnimationFrame(rafId)
  }, [scene])

  // ── Toggle occlusion hole on/off based on phase ──
  // Only show live HTML when fully focused (camera locked) — no floating during zoom
  const showHtml = phase === 'focused'
  useEffect(() => {
    for (const { mesh, origMat } of holeMeshesRef.current) {
      if (showHtml) {
        mesh.material = holeMat.current
        mesh.renderOrder = -1
        mesh.castShadow = false
        mesh.receiveShadow = false
      } else {
        // Restore: screen mesh gets wallpaper, glass gets original material
        if (mesh === screenMeshRef.current) {
          mesh.material = screenPreviewMat
        } else {
          mesh.material = origMat
        }
        mesh.renderOrder = 0
        mesh.castShadow = true
        mesh.receiveShadow = true
      }
    }
  }, [showHtml, screenPreviewMat])

  // ── Per-frame: project glass panel vertices → pixel-perfect clip-path ──
  const lastClip = useRef('')
  useFrame(() => {
    if (!screenPortal?.current) return

    // When not showing HTML, clear the clip-path (nothing to clip)
    if (!showHtml) {
      if (lastClip.current !== '') {
        screenPortal.current.style.clipPath = ''
        lastClip.current = ''
      }
      return
    }

    const verts = screenWorldVerts.current
    if (!verts.length) return

    // Project every glass-panel vertex to 2D viewport coordinates
    const projected: [number, number][] = verts.map((v) => {
      const p = v.clone().project(camera)
      return [
        (p.x + 1) / 2 * size.width,
        (1 - p.y) / 2 * size.height,
      ]
    })

    // Convex hull → the tightest polygon enclosing the screen
    const hull = convexHull(projected)

    const path = hull
      .map(([x, y]) => `${x.toFixed(1)}px ${y.toFixed(1)}px`)
      .join(', ')

    // Only touch the DOM when the value actually changes
    const clip = `polygon(${path})`
    if (clip !== lastClip.current) {
      screenPortal.current.style.clipPath = clip
      lastClip.current = clip
    }
  })

  // Intentionally oversize the Html so it ALWAYS covers the full clip area.
  // The clip-path trims the overflow — no trial-and-error distanceFactor needed.
  const distanceFactor = screenData
    ? screenData.screenWidthScene * 0.42
    : 0.24

  return (
    <group ref={groupRef} position={position}>
      <primitive object={scene} scale={MODEL_SCALE} />

      {screenData && showHtml && (
        <Html
          transform
          portal={screenPortal as unknown as RefObject<HTMLElement>}
          distanceFactor={distanceFactor}
          position={screenData.localPos}
          rotation={screenData.rotation}
          style={{
            width: '1024px',
            height: '640px',
            overflow: 'hidden',
            background: '#000',
          }}
        >
          <div
            style={{
              width: '1024px',
              height: '640px',
              overflow: 'hidden',
            }}
            className="screen-html-wrapper"
          >
            <App />
          </div>
        </Html>
      )}
    </group>
  )
}

useGLTF.preload('/models/macbook_pro_m3.glb', false, true)
useTexture.preload('/wallpaper.jpg')

// ── Convex Hull — Andrew's monotone chain, O(n log n) ──
function convexHull(points: [number, number][]): [number, number][] {
  const sorted = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1])
  if (sorted.length <= 2) return sorted

  const cross = (
    o: [number, number],
    a: [number, number],
    b: [number, number]
  ) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

  const lower: [number, number][] = []
  for (const p of sorted) {
    while (
      lower.length >= 2 &&
      cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0
    )
      lower.pop()
    lower.push(p)
  }

  const upper: [number, number][] = []
  for (let i = sorted.length - 1; i >= 0; i--) {
    const p = sorted[i]
    while (
      upper.length >= 2 &&
      cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0
    )
      upper.pop()
    upper.push(p)
  }

  return [...lower.slice(0, -1), ...upper.slice(0, -1)]
}
