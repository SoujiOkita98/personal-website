import { useRef, useEffect, useCallback } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

const MODEL_PATH = '/models/siege_tank.glb'
const MODEL_SCALE = 3.0

interface SiegeTankModelProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  shouldSiege?: boolean
  onBoundsReady?: (center: THREE.Vector3, size: THREE.Vector3) => void
}

export default function SiegeTankModel({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  shouldSiege = false,
  onBoundsReady,
}: SiegeTankModelProps) {
  const group = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF(MODEL_PATH)
  const { actions } = useAnimations(animations, group)
  const siegeState = useRef<'tank' | 'sieged'>('tank')
  const boundsReported = useRef(false)

  // Enable shadows and brighten the model's materials (once)
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial
        if (mat?.isMeshStandardMaterial) {
          mat.envMapIntensity = 3.0
          mat.roughness = Math.max(mat.roughness * 0.7, 0.2)
          // Store original color (clear stale cache from previous version)
          const ud = mat.userData as Record<string, unknown>
          if (!ud.__origColorV3) {
            ud.__origColorV3 = mat.color.clone()
          }
          mat.color.copy(ud.__origColorV3 as THREE.Color).multiplyScalar(3.5)
          mat.needsUpdate = true
        }
      }
    })
  }, [scene])

  // Report world bounds once
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
    // Wait a frame for transforms to be applied
    requestAnimationFrame(reportBounds)
  }, [reportBounds, scene])

  // Reset skeleton to bind pose and animations to tank mode on mount
  useEffect(() => {
    if (!actions) return
    Object.values(actions).forEach((a) => a?.stop())
    // Reset all skinned mesh skeletons to their rest/bind pose
    scene.traverse((child) => {
      if ((child as THREE.SkinnedMesh).isSkinnedMesh) {
        ;(child as THREE.SkinnedMesh).skeleton?.pose()
      }
    })
    siegeState.current = 'tank'
  }, [actions]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!actions) return

    if (shouldSiege && siegeState.current === 'tank') {
      siegeState.current = 'sieged'
      Object.values(actions).forEach((a) => a?.stop())
      const siegeAction = actions['Armature_Stand Work Start_full']
      if (siegeAction) {
        siegeAction.reset()
        siegeAction.clampWhenFinished = true
        siegeAction.setLoop(THREE.LoopOnce, 1)
        siegeAction.play()
      }
    }

    if (!shouldSiege && siegeState.current === 'sieged') {
      siegeState.current = 'tank'
      Object.values(actions).forEach((a) => a?.stop())
      const unsiegeAction = actions['Armature_Stand Work End_full']
      if (unsiegeAction) {
        unsiegeAction.reset()
        unsiegeAction.clampWhenFinished = true
        unsiegeAction.setLoop(THREE.LoopOnce, 1)
        unsiegeAction.play()
      }
    }
  }, [shouldSiege, actions])

  return (
    <group ref={group} position={position} rotation={rotation} scale={MODEL_SCALE}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload(MODEL_PATH)
