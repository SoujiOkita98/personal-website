import { useRef, useEffect, useCallback } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const MODEL_PATH = '/models/nintendo_3ds_xl.glb'
const MODEL_SCALE = 0.008

interface Nintendo3DSModelProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  onBoundsReady?: (center: THREE.Vector3, size: THREE.Vector3) => void
}

export default function Nintendo3DSModel({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onBoundsReady,
}: Nintendo3DSModelProps) {
  const group = useRef<THREE.Group>(null)
  const { scene } = useGLTF(MODEL_PATH, false, true)
  const boundsReported = useRef(false)

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        const mesh = child as THREE.Mesh
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
        mats.forEach((mat) => {
          const stdMat = mat as THREE.MeshStandardMaterial
          // Hue-shift the blue shell texture to red via shader injection
          if (mat.name === 'initialShadingGroup' && stdMat.map) {
            stdMat.onBeforeCompile = (shader) => {
              shader.fragmentShader = shader.fragmentShader.replace(
                '#include <map_fragment>',
                `
                #ifdef USE_MAP
                  vec4 sampledDiffuseColor = texture2D( map, vMapUv );
                  sampledDiffuseColor.rgb = vec3(
                    sampledDiffuseColor.b * 1.1,
                    sampledDiffuseColor.g * 0.7,
                    sampledDiffuseColor.r * 0.3
                  );
                  diffuseColor *= sampledDiffuseColor;
                #endif
                `
              )
            }
            stdMat.needsUpdate = true
          }
        })
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
