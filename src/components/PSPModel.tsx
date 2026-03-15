import { useRef, useEffect, useCallback } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const MODEL_PATH = '/models/sony_psp.glb'
const MODEL_SCALE = 0.008

interface PSPModelProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  onBoundsReady?: (center: THREE.Vector3, size: THREE.Vector3) => void
}

export default function PSPModel({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onBoundsReady,
}: PSPModelProps) {
  const group = useRef<THREE.Group>(null)
  const { scene } = useGLTF(MODEL_PATH, false, true)
  const boundsReported = useRef(false)

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [scene])

  const reportBounds = useCallback(() => {
    if (!group.current || boundsReported.current || !onBoundsReady) return
    boundsReported.current = true
    const box = new THREE.Box3().setFromObject(group.current)
    const center = new THREE.Vector3()
    const size = new THREE.Vector3()
    box.getCenter(center)
    box.getSize(size)
    onBoundsReady(center, size)
  }, [onBoundsReady])

  useEffect(() => {
    requestAnimationFrame(reportBounds)
  }, [reportBounds, scene])

  return (
    <group ref={group} position={position} rotation={rotation} scale={MODEL_SCALE}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload(MODEL_PATH, false, true)
