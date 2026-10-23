import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

export default function StudioEnvironment({ dark = false }: { dark?: boolean }) {
  const floorTexture = useMemo(() => {
    const size = 512
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!
    const gradient = ctx.createRadialGradient(
      size / 2, size / 2, 0,
      size / 2, size / 2, size / 2,
    )
    gradient.addColorStop(0, dark ? '#242b38' : '#d8d8d8')
    gradient.addColorStop(0.5, dark ? '#1c2330' : '#e0e0e0')
    gradient.addColorStop(0.8, dark ? '#141922' : '#e8e8e8')
    gradient.addColorStop(1, dark ? 'rgba(20, 25, 34, 0)' : 'rgba(232, 232, 232, 0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  }, [dark])

  useEffect(() => () => floorTexture.dispose(), [floorTexture])

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <circleGeometry args={[30, 64]} />
      <meshStandardMaterial
        map={floorTexture}
        transparent
        roughness={0.85}
        metalness={0.05}
      />
    </mesh>
  )
}
