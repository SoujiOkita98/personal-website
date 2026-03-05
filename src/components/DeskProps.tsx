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

/* ===== STATION WAGON MODEL CAR ===== */
export function StationWagon({ position }: { position: [number, number, number] }) {
  const bodyColor = '#f0ece6'
  const trimColor = '#c0c0c0'
  const windowColor = '#87afc7'
  const tireColor = '#1a1a1a'
  const hubColor = '#d0d0d0'

  return (
    <group position={position} rotation={[0, -0.4, 0]}>
      {/* Lower body */}
      <mesh position={[0, 0.018, 0]} castShadow>
        <boxGeometry args={[0.12, 0.02, 0.045]} />
        <meshStandardMaterial color={bodyColor} roughness={0.35} metalness={0.15} />
      </mesh>

      {/* Upper cabin - wagon style (long flat roof) */}
      <mesh position={[-0.005, 0.038, 0]} castShadow>
        <boxGeometry args={[0.09, 0.02, 0.04]} />
        <meshStandardMaterial color={bodyColor} roughness={0.35} metalness={0.15} />
      </mesh>

      {/* Windshield (angled front) */}
      <mesh position={[0.04, 0.035, 0]} rotation={[0, 0, 0.35]} castShadow>
        <boxGeometry args={[0.022, 0.002, 0.036]} />
        <meshStandardMaterial color={windowColor} roughness={0.1} metalness={0.3} transparent opacity={0.7} />
      </mesh>

      {/* Side windows left */}
      <mesh position={[-0.005, 0.038, 0.0205]}>
        <boxGeometry args={[0.07, 0.014, 0.001]} />
        <meshStandardMaterial color={windowColor} roughness={0.1} metalness={0.3} transparent opacity={0.7} />
      </mesh>

      {/* Side windows right */}
      <mesh position={[-0.005, 0.038, -0.0205]}>
        <boxGeometry args={[0.07, 0.014, 0.001]} />
        <meshStandardMaterial color={windowColor} roughness={0.1} metalness={0.3} transparent opacity={0.7} />
      </mesh>

      {/* Rear window */}
      <mesh position={[-0.05, 0.035, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.002, 0.016, 0.036]} />
        <meshStandardMaterial color={windowColor} roughness={0.1} metalness={0.3} transparent opacity={0.7} />
      </mesh>

      {/* Front bumper */}
      <mesh position={[0.062, 0.012, 0]}>
        <boxGeometry args={[0.005, 0.01, 0.046]} />
        <meshStandardMaterial color={trimColor} roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Rear bumper */}
      <mesh position={[-0.062, 0.012, 0]}>
        <boxGeometry args={[0.005, 0.01, 0.046]} />
        <meshStandardMaterial color={trimColor} roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Headlights */}
      <mesh position={[0.061, 0.02, 0.016]}>
        <sphereGeometry args={[0.004, 8, 8]} />
        <meshStandardMaterial color="#fffde0" emissive="#fffde0" emissiveIntensity={0.2} roughness={0.2} />
      </mesh>
      <mesh position={[0.061, 0.02, -0.016]}>
        <sphereGeometry args={[0.004, 8, 8]} />
        <meshStandardMaterial color="#fffde0" emissive="#fffde0" emissiveIntensity={0.2} roughness={0.2} />
      </mesh>

      {/* Taillights */}
      <mesh position={[-0.061, 0.02, 0.016]}>
        <boxGeometry args={[0.003, 0.006, 0.008]} />
        <meshStandardMaterial color="#cc3333" emissive="#cc3333" emissiveIntensity={0.15} roughness={0.3} />
      </mesh>
      <mesh position={[-0.061, 0.02, -0.016]}>
        <boxGeometry args={[0.003, 0.006, 0.008]} />
        <meshStandardMaterial color="#cc3333" emissive="#cc3333" emissiveIntensity={0.15} roughness={0.3} />
      </mesh>

      {/* Wheels - front left */}
      <group position={[0.035, 0.008, 0.025]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.009, 0.009, 0.006, 12]} />
          <meshStandardMaterial color={tireColor} roughness={0.9} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.006, 0.006, 0.007, 8]} />
          <meshStandardMaterial color={hubColor} roughness={0.2} metalness={0.6} />
        </mesh>
      </group>

      {/* Wheels - front right */}
      <group position={[0.035, 0.008, -0.025]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.009, 0.009, 0.006, 12]} />
          <meshStandardMaterial color={tireColor} roughness={0.9} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.006, 0.006, 0.007, 8]} />
          <meshStandardMaterial color={hubColor} roughness={0.2} metalness={0.6} />
        </mesh>
      </group>

      {/* Wheels - rear left */}
      <group position={[-0.035, 0.008, 0.025]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.009, 0.009, 0.006, 12]} />
          <meshStandardMaterial color={tireColor} roughness={0.9} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.006, 0.006, 0.007, 8]} />
          <meshStandardMaterial color={hubColor} roughness={0.2} metalness={0.6} />
        </mesh>
      </group>

      {/* Wheels - rear right */}
      <group position={[-0.035, 0.008, -0.025]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.009, 0.009, 0.006, 12]} />
          <meshStandardMaterial color={tireColor} roughness={0.9} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.006, 0.006, 0.007, 8]} />
          <meshStandardMaterial color={hubColor} roughness={0.2} metalness={0.6} />
        </mesh>
      </group>

      {/* Roof rack rails */}
      <mesh position={[0, 0.05, 0.018]}>
        <boxGeometry args={[0.07, 0.002, 0.002]} />
        <meshStandardMaterial color={trimColor} roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.05, -0.018]}>
        <boxGeometry args={[0.07, 0.002, 0.002]} />
        <meshStandardMaterial color={trimColor} roughness={0.3} metalness={0.5} />
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
