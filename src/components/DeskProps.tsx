import { useMemo } from 'react'
import * as THREE from 'three'
import { RoundedBox } from '@react-three/drei'

/* ===== COFFEE MUG ===== */
export function CoffeeMug({ position }: { position: [number, number, number] }) {
  const points = useMemo(
    () => [
      new THREE.Vector2(0.000, 0.000),
      new THREE.Vector2(0.028, 0.000),
      new THREE.Vector2(0.026, 0.004),
      new THREE.Vector2(0.030, 0.018),
      new THREE.Vector2(0.033, 0.055),
      new THREE.Vector2(0.036, 0.088),
      new THREE.Vector2(0.035, 0.093),
      new THREE.Vector2(0.032, 0.095),
      new THREE.Vector2(0.028, 0.090),
      new THREE.Vector2(0.026, 0.055),
      new THREE.Vector2(0.025, 0.010),
      new THREE.Vector2(0.000, 0.007),
    ],
    [],
  )

  return (
    <group position={position}>
      <mesh castShadow>
        <latheGeometry args={[points, 24]} />
        <meshStandardMaterial color="#f5f0e8" roughness={0.4} metalness={0.05} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.042, 0.050, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <torusGeometry args={[0.018, 0.005, 8, 16]} />
        <meshStandardMaterial color="#f5f0e8" roughness={0.4} metalness={0.05} />
      </mesh>
      {/* Coffee surface */}
      <mesh position={[0, 0.082, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.027, 24]} />
        <meshStandardMaterial color="#3a1f0a" roughness={0.3} />
      </mesh>
    </group>
  )
}

/* ===== MOUSE PAD ===== */
export function MousePad({ position }: { position: [number, number, number] }) {
  return (
    <RoundedBox
      args={[0.25, 0.003, 0.2]}
      radius={0.015}
      smoothness={4}
      position={position}
      receiveShadow
    >
      <meshStandardMaterial color="#2a2a2a" roughness={0.9} metalness={0} />
    </RoundedBox>
  )
}

/* ===== MOUSE ===== */
export function Mouse({ position }: { position: [number, number, number] }) {
  const mouseShape = useMemo(() => {
    const shape = new THREE.Shape()
    const w = 0.022
    const h = 0.035
    const r = 0.012
    shape.moveTo(-w + r, -h)
    shape.lineTo(w - r, -h)
    shape.quadraticCurveTo(w, -h, w, -h + r)
    shape.lineTo(w, h - r)
    shape.quadraticCurveTo(w, h, w - r, h)
    shape.lineTo(-w + r, h)
    shape.quadraticCurveTo(-w, h, -w, h - r)
    shape.lineTo(-w, -h + r)
    shape.quadraticCurveTo(-w, -h, -w + r, -h)
    return shape
  }, [])

  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.008, 0]} castShadow>
        <extrudeGeometry
          args={[
            mouseShape,
            {
              depth: 0.012,
              bevelEnabled: true,
              bevelThickness: 0.007,
              bevelSize: 0.004,
              bevelSegments: 8,
            },
          ]}
        />
        <meshStandardMaterial color="#e0e0e0" roughness={0.25} metalness={0.3} />
      </mesh>
      {/* Scroll wheel */}
      <mesh position={[0, 0.018, -0.008]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.003, 0.003, 0.010, 8]} />
        <meshStandardMaterial color="#999" roughness={0.6} />
      </mesh>
    </group>
  )
}

/* ===== NOTEBOOK ===== */
export function Notebook({
  position,
  rotation = [0, 0, 0],
  color = '#1a1a1a',
}: {
  position: [number, number, number]
  rotation?: [number, number, number]
  color?: string
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Cover */}
      <RoundedBox args={[0.13, 0.012, 0.18]} radius={0.002} smoothness={4} castShadow>
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.05} />
      </RoundedBox>
      {/* Pages */}
      <mesh position={[0.002, 0, 0]}>
        <boxGeometry args={[0.12, 0.008, 0.17]} />
        <meshStandardMaterial color="#f5f2eb" roughness={0.9} />
      </mesh>
      {/* Elastic band */}
      <mesh position={[0, 0.007, 0]}>
        <boxGeometry args={[0.003, 0.001, 0.18]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
    </group>
  )
}

/* ===== BOOK STACK ===== */
export function BookStack({ position }: { position: [number, number, number] }) {
  const books = [
    { color: '#2c3e50', w: 0.14, d: 0.19, h: 0.015, ox: 0, oz: 0 },
    { color: '#c0392b', w: 0.13, d: 0.18, h: 0.012, ox: 0.005, oz: -0.003 },
    { color: '#f39c12', w: 0.12, d: 0.17, h: 0.01, ox: -0.003, oz: 0.005 },
  ]

  let y = 0
  return (
    <group position={position}>
      {books.map((book, i) => {
        const posY = y + book.h / 2
        y += book.h
        return (
          <RoundedBox
            key={i}
            args={[book.w, book.h, book.d]}
            radius={0.002}
            smoothness={4}
            position={[book.ox, posY, book.oz]}
            castShadow
          >
            <meshStandardMaterial color={book.color} roughness={0.7} />
          </RoundedBox>
        )
      })}
    </group>
  )
}
