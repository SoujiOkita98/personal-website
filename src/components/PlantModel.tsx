import { useMemo } from 'react'
import * as THREE from 'three'

interface PlantModelProps {
  position?: [number, number, number]
}

export default function PlantModel({ position = [0, 0, 0] }: PlantModelProps) {
  const potProfile = useMemo(
    () => [
      new THREE.Vector2(0.000, 0.000),
      new THREE.Vector2(0.045, 0.000),
      new THREE.Vector2(0.043, 0.008),
      new THREE.Vector2(0.050, 0.050),
      new THREE.Vector2(0.065, 0.110),
      new THREE.Vector2(0.070, 0.120),
      new THREE.Vector2(0.067, 0.125),
      new THREE.Vector2(0.060, 0.120),
      new THREE.Vector2(0.055, 0.050),
      new THREE.Vector2(0.042, 0.010),
      new THREE.Vector2(0.000, 0.008),
    ],
    [],
  )

  const foliage = [
    { pos: [0, 0.20, 0] as const, scale: 0.08, color: '#5a9e3c' },
    { pos: [0.035, 0.26, 0.015] as const, scale: 0.065, color: '#6ab04c' },
    { pos: [-0.025, 0.24, -0.015] as const, scale: 0.06, color: '#78c850' },
    { pos: [0.015, 0.30, -0.01] as const, scale: 0.05, color: '#82d45a' },
    { pos: [-0.015, 0.28, 0.025] as const, scale: 0.055, color: '#6ab04c' },
    { pos: [0.03, 0.22, -0.025] as const, scale: 0.045, color: '#5a9e3c' },
  ]

  return (
    <group position={position}>
      {/* Pot */}
      <mesh castShadow>
        <latheGeometry args={[potProfile, 24]} />
        <meshStandardMaterial color="#c4956a" roughness={0.7} metalness={0.05} />
      </mesh>

      {/* Soil */}
      <mesh position={[0, 0.115, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.057, 24]} />
        <meshStandardMaterial color="#5a3e2b" roughness={1} />
      </mesh>

      {/* Foliage cluster */}
      {foliage.map((leaf, i) => (
        <mesh key={i} position={leaf.pos as [number, number, number]} castShadow>
          <sphereGeometry args={[leaf.scale, 12, 8]} />
          <meshStandardMaterial color={leaf.color} roughness={0.8} metalness={0} />
        </mesh>
      ))}
    </group>
  )
}
