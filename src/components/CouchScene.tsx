import { useRef, useEffect, useCallback } from 'react'
import * as THREE from 'three'
import PSPModel from './PSPModel'
import Nintendo3DSModel from './Nintendo3DSModel'

interface CouchSceneProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  onBoundsReady?: (center: THREE.Vector3, size: THREE.Vector3) => void
  onPSPBoundsReady?: (center: THREE.Vector3, size: THREE.Vector3) => void
  on3DSBoundsReady?: (center: THREE.Vector3, size: THREE.Vector3) => void
}

// Low-poly couch built from box geometries
function Couch() {
  return (
    <group>
      {/* Seat cushion */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.2, 0.7]} />
        <meshStandardMaterial color="#5c4033" roughness={0.85} />
      </mesh>
      {/* Back rest */}
      <mesh position={[0, 0.55, -0.28]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.45, 0.18]} />
        <meshStandardMaterial color="#4a3328" roughness={0.85} />
      </mesh>
      {/* Left armrest */}
      <mesh position={[-0.75, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.15, 0.3, 0.7]} />
        <meshStandardMaterial color="#4a3328" roughness={0.85} />
      </mesh>
      {/* Right armrest */}
      <mesh position={[0.75, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.15, 0.3, 0.7]} />
        <meshStandardMaterial color="#4a3328" roughness={0.85} />
      </mesh>
      {/* Couch base/legs */}
      <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.12, 0.65]} />
        <meshStandardMaterial color="#3a2518" roughness={0.9} />
      </mesh>
      {/* Left seat cushion detail */}
      <mesh position={[-0.38, 0.36, 0.02]} castShadow>
        <boxGeometry args={[0.65, 0.04, 0.6]} />
        <meshStandardMaterial color="#6b4c3b" roughness={0.8} />
      </mesh>
      {/* Right seat cushion detail */}
      <mesh position={[0.38, 0.36, 0.02]} castShadow>
        <boxGeometry args={[0.65, 0.04, 0.6]} />
        <meshStandardMaterial color="#6b4c3b" roughness={0.8} />
      </mesh>
      {/* Throw pillow left */}
      <mesh position={[-0.5, 0.48, -0.12]} rotation={[0.15, 0.2, 0.1]} castShadow>
        <boxGeometry args={[0.28, 0.28, 0.08]} />
        <meshStandardMaterial color="#c4785a" roughness={0.75} />
      </mesh>
      {/* Throw pillow right */}
      <mesh position={[0.45, 0.48, -0.1]} rotation={[-0.1, -0.15, -0.08]} castShadow>
        <boxGeometry args={[0.26, 0.26, 0.08]} />
        <meshStandardMaterial color="#8fbc8f" roughness={0.75} />
      </mesh>
    </group>
  )
}

// Side table — widened to hold two items, tall enough to clear couch
function SideTable({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Tabletop */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.55, 0.03, 0.4]} />
        <meshStandardMaterial color="#deb887" roughness={0.6} metalness={0.05} />
      </mesh>
      {/* Legs */}
      {[[-0.23, 0.3, -0.16], [0.23, 0.3, -0.16], [-0.23, 0.3, 0.16], [0.23, 0.3, 0.16]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <boxGeometry args={[0.03, 0.6, 0.03]} />
          <meshStandardMaterial color="#c4a47a" roughness={0.7} />
        </mesh>
      ))}
      {/* PSP rod stand */}
      <mesh position={[-0.12, 0.615, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 24]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[-0.12, 0.645, -0.01]} castShadow>
        <cylinderGeometry args={[0.005, 0.005, 0.07, 8]} />
        <meshStandardMaterial color="#333333" roughness={0.2} metalness={0.6} />
      </mesh>
      {/* 3DS rod stand */}
      <mesh position={[0.15, 0.615, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 24]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[0.15, 0.635, -0.01]} castShadow>
        <cylinderGeometry args={[0.005, 0.005, 0.05, 8]} />
        <meshStandardMaterial color="#333333" roughness={0.2} metalness={0.6} />
      </mesh>
    </group>
  )
}

// TV on stand — placed in FRONT of the couch
function TVSetup({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* TV stand / entertainment center */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.0, 0.3, 0.35]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.8} />
      </mesh>
      {/* Stand shelf */}
      <mesh position={[0, 0.32, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.95, 0.02, 0.33]} />
        <meshStandardMaterial color="#333333" roughness={0.7} />
      </mesh>
      {/* Console on stand */}
      <mesh position={[-0.25, 0.08, 0.05]} castShadow>
        <boxGeometry args={[0.28, 0.06, 0.18]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.5} />
      </mesh>
      {/* TV screen */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[1.1, 0.62, 0.04]} />
        <meshStandardMaterial color="#111111" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Screen glow — facing the couch (toward -Z) */}
      <mesh position={[0, 0.7, -0.025]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[1.0, 0.54]} />
        <meshStandardMaterial
          color="#1a3a5c"
          emissive="#1a3a5c"
          emissiveIntensity={0.3}
          roughness={0.2}
        />
      </mesh>
      {/* TV stand leg */}
      <mesh position={[0, 0.46, 0]} castShadow>
        <boxGeometry args={[0.06, 0.22, 0.06]} />
        <meshStandardMaterial color="#222222" roughness={0.6} />
      </mesh>
      {/* Controller on the stand */}
      <mesh position={[0.25, 0.35, 0.02]} rotation={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.12, 0.03, 0.08]} />
        <meshStandardMaterial color="#333333" roughness={0.6} />
      </mesh>
    </group>
  )
}

// Full standing bookshelf behind the couch
function Bookshelf({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Back panel */}
      <mesh position={[0, 0.65, -0.12]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 1.3, 0.03]} />
        <meshStandardMaterial color="#5c4033" roughness={0.8} />
      </mesh>
      {/* Left side panel */}
      <mesh position={[-0.68, 0.65, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.04, 1.3, 0.28]} />
        <meshStandardMaterial color="#6b4c3b" roughness={0.75} />
      </mesh>
      {/* Right side panel */}
      <mesh position={[0.68, 0.65, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.04, 1.3, 0.28]} />
        <meshStandardMaterial color="#6b4c3b" roughness={0.75} />
      </mesh>
      {/* Bottom shelf (base) */}
      <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.04, 0.28]} />
        <meshStandardMaterial color="#6b4c3b" roughness={0.75} />
      </mesh>
      {/* Shelf 1 */}
      <mesh position={[0, 0.34, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.32, 0.03, 0.26]} />
        <meshStandardMaterial color="#6b4c3b" roughness={0.75} />
      </mesh>
      {/* Shelf 2 */}
      <mesh position={[0, 0.66, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.32, 0.03, 0.26]} />
        <meshStandardMaterial color="#6b4c3b" roughness={0.75} />
      </mesh>
      {/* Shelf 3 */}
      <mesh position={[0, 0.98, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.32, 0.03, 0.26]} />
        <meshStandardMaterial color="#6b4c3b" roughness={0.75} />
      </mesh>
      {/* Top */}
      <mesh position={[0, 1.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.04, 0.28]} />
        <meshStandardMaterial color="#6b4c3b" roughness={0.75} />
      </mesh>

      {/* === Bottom shelf items === */}
      {/* Books row */}
      <mesh position={[-0.4, 0.17, 0.02]} castShadow>
        <boxGeometry args={[0.08, 0.26, 0.16]} />
        <meshStandardMaterial color="#8b4513" roughness={0.8} />
      </mesh>
      <mesh position={[-0.3, 0.16, 0.02]} castShadow>
        <boxGeometry args={[0.07, 0.24, 0.16]} />
        <meshStandardMaterial color="#2f5233" roughness={0.8} />
      </mesh>
      <mesh position={[-0.21, 0.17, 0.02]} castShadow>
        <boxGeometry args={[0.08, 0.26, 0.16]} />
        <meshStandardMaterial color="#4a3080" roughness={0.8} />
      </mesh>
      <mesh position={[-0.11, 0.15, 0.02]} castShadow>
        <boxGeometry args={[0.07, 0.22, 0.16]} />
        <meshStandardMaterial color="#cc6633" roughness={0.8} />
      </mesh>
      {/* Storage box */}
      <mesh position={[0.35, 0.12, 0.02]} castShadow>
        <boxGeometry args={[0.3, 0.16, 0.2]} />
        <meshStandardMaterial color="#c4a47a" roughness={0.7} />
      </mesh>

      {/* === Shelf 1 items === */}
      {/* Figurine — small robot/mech */}
      <mesh position={[-0.45, 0.43, 0.02]} castShadow>
        <boxGeometry args={[0.06, 0.14, 0.06]} />
        <meshStandardMaterial color="#4a90d9" roughness={0.5} />
      </mesh>
      <mesh position={[-0.45, 0.52, 0.02]} castShadow>
        <boxGeometry args={[0.05, 0.04, 0.05]} />
        <meshStandardMaterial color="#4a90d9" roughness={0.5} />
      </mesh>
      {/* Trophy */}
      <mesh position={[-0.1, 0.42, 0.02]} castShadow>
        <cylinderGeometry args={[0.03, 0.04, 0.12, 6]} />
        <meshStandardMaterial color="#ffd700" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[-0.1, 0.50, 0.02]} castShadow>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#ffd700" roughness={0.3} metalness={0.6} />
      </mesh>
      {/* More books */}
      <mesh position={[0.2, 0.46, 0.02]} castShadow>
        <boxGeometry args={[0.16, 0.04, 0.12]} />
        <meshStandardMaterial color="#1a3a5c" roughness={0.8} />
      </mesh>
      <mesh position={[0.2, 0.50, 0.02]} castShadow>
        <boxGeometry args={[0.15, 0.04, 0.12]} />
        <meshStandardMaterial color="#8b2252" roughness={0.8} />
      </mesh>
      {/* Small figure */}
      <mesh position={[0.5, 0.42, 0.02]} castShadow>
        <boxGeometry args={[0.05, 0.12, 0.05]} />
        <meshStandardMaterial color="#cc4444" roughness={0.6} />
      </mesh>

      {/* === Shelf 2 items === */}
      {/* Framed photo */}
      <mesh position={[-0.4, 0.78, -0.06]} castShadow>
        <boxGeometry args={[0.14, 0.18, 0.02]} />
        <meshStandardMaterial color="#222222" roughness={0.5} />
      </mesh>
      <mesh position={[-0.4, 0.78, -0.048]}>
        <planeGeometry args={[0.1, 0.14]} />
        <meshStandardMaterial color="#aabbcc" roughness={0.8} />
      </mesh>
      {/* Small plant */}
      <mesh position={[0, 0.72, 0.02]} castShadow>
        <cylinderGeometry args={[0.04, 0.035, 0.08, 8]} />
        <meshStandardMaterial color="#d4956a" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.80, 0.02]} castShadow>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#4a8c5c" roughness={0.8} />
      </mesh>
      {/* Game case stack */}
      <mesh position={[0.4, 0.71, 0.02]} castShadow>
        <boxGeometry args={[0.12, 0.02, 0.15]} />
        <meshStandardMaterial color="#1a2a4a" roughness={0.6} />
      </mesh>
      <mesh position={[0.4, 0.73, 0.02]} castShadow>
        <boxGeometry args={[0.12, 0.02, 0.15]} />
        <meshStandardMaterial color="#2a4a2a" roughness={0.6} />
      </mesh>
      <mesh position={[0.4, 0.75, 0.02]} castShadow>
        <boxGeometry args={[0.12, 0.02, 0.15]} />
        <meshStandardMaterial color="#4a1a1a" roughness={0.6} />
      </mesh>

      {/* === Top shelf items === */}
      {/* Decorative cube */}
      <mesh position={[-0.3, 1.07, 0.02]} castShadow>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="#e8c170" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Another small plant */}
      <mesh position={[0.15, 1.04, 0.02]} castShadow>
        <cylinderGeometry args={[0.03, 0.025, 0.06, 8]} />
        <meshStandardMaterial color="#8b6548" roughness={0.7} />
      </mesh>
      <mesh position={[0.15, 1.10, 0.02]} castShadow>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshStandardMaterial color="#3a7a4a" roughness={0.8} />
      </mesh>
      {/* Clock/round decor */}
      <mesh position={[0.5, 1.08, -0.04]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
        <meshStandardMaterial color="#ddd" roughness={0.4} metalness={0.2} />
      </mesh>
    </group>
  )
}

// PC Gaming desk setup with monitor, tower, keyboard, mouse
function PCGamingSetup({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Gaming desk */}
      <mesh position={[0, 0.36, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.04, 0.6]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
      </mesh>
      {/* Desk legs */}
      {[[-0.55, 0.17, -0.25], [0.55, 0.17, -0.25], [-0.55, 0.17, 0.25], [0.55, 0.17, 0.25]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <boxGeometry args={[0.04, 0.34, 0.04]} />
          <meshStandardMaterial color="#222222" roughness={0.6} />
        </mesh>
      ))}
      {/* Cable management bar under desk */}
      <mesh position={[0, 0.08, -0.2]} castShadow>
        <boxGeometry args={[0.8, 0.02, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>

      {/* Main monitor */}
      <mesh position={[0, 0.68, -0.18]} castShadow>
        <boxGeometry args={[0.75, 0.44, 0.03]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Monitor screen glow */}
      <mesh position={[0, 0.68, -0.163]}>
        <planeGeometry args={[0.68, 0.38]} />
        <meshStandardMaterial
          color="#0d2847"
          emissive="#1a4a7a"
          emissiveIntensity={0.4}
          roughness={0.2}
        />
      </mesh>
      {/* Monitor stand neck */}
      <mesh position={[0, 0.44, -0.18]} castShadow>
        <boxGeometry args={[0.06, 0.06, 0.06]} />
        <meshStandardMaterial color="#222222" roughness={0.5} metalness={0.2} />
      </mesh>
      {/* Monitor stand base */}
      <mesh position={[0, 0.39, -0.18]} castShadow>
        <boxGeometry args={[0.2, 0.02, 0.12]} />
        <meshStandardMaterial color="#222222" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Second monitor (smaller, angled) */}
      <mesh position={[0.52, 0.64, -0.15]} rotation={[0, -0.3, 0]} castShadow>
        <boxGeometry args={[0.5, 0.32, 0.025]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Second monitor screen glow */}
      <mesh position={[0.518, 0.64, -0.136]} rotation={[0, -0.3, 0]}>
        <planeGeometry args={[0.44, 0.26]} />
        <meshStandardMaterial
          color="#1a2a1a"
          emissive="#2a5a3a"
          emissiveIntensity={0.3}
          roughness={0.2}
        />
      </mesh>
      {/* Second monitor stand */}
      <mesh position={[0.52, 0.46, -0.15]} castShadow>
        <boxGeometry args={[0.05, 0.06, 0.05]} />
        <meshStandardMaterial color="#222222" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Mechanical keyboard */}
      <mesh position={[-0.05, 0.395, 0.05]} castShadow>
        <boxGeometry args={[0.38, 0.025, 0.13]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.6} />
      </mesh>
      {/* Keyboard RGB strip */}
      <mesh position={[-0.05, 0.41, 0.05]}>
        <boxGeometry args={[0.35, 0.005, 0.11]} />
        <meshStandardMaterial
          color="#333333"
          emissive="#ff4488"
          emissiveIntensity={0.15}
          roughness={0.4}
        />
      </mesh>

      {/* Mouse */}
      <mesh position={[0.3, 0.39, 0.08]} castShadow>
        <boxGeometry args={[0.05, 0.02, 0.08]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>
      {/* Mouse RGB */}
      <mesh position={[0.3, 0.405, 0.08]}>
        <boxGeometry args={[0.02, 0.005, 0.03]} />
        <meshStandardMaterial
          color="#222222"
          emissive="#44aaff"
          emissiveIntensity={0.3}
          roughness={0.3}
        />
      </mesh>
      {/* Mousepad */}
      <mesh position={[0.28, 0.375, 0.08]} receiveShadow>
        <boxGeometry args={[0.3, 0.005, 0.25]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.9} />
      </mesh>

      {/* PC Tower — on the floor next to desk */}
      <mesh position={[-0.75, 0.22, -0.1]} castShadow receiveShadow>
        <boxGeometry args={[0.22, 0.44, 0.4]} />
        <meshStandardMaterial color="#111111" roughness={0.5} metalness={0.1} />
      </mesh>
      {/* PC Tower front panel */}
      <mesh position={[-0.75, 0.22, 0.1]} castShadow>
        <boxGeometry args={[0.2, 0.42, 0.01]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.2} />
      </mesh>
      {/* PC Tower tempered glass side */}
      <mesh position={[-0.64, 0.22, -0.1]}>
        <boxGeometry args={[0.005, 0.4, 0.38]} />
        <meshStandardMaterial
          color="#111122"
          transparent
          opacity={0.4}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
      {/* PC RGB glow inside tower */}
      <mesh position={[-0.72, 0.28, -0.1]}>
        <boxGeometry args={[0.12, 0.08, 0.3]} />
        <meshStandardMaterial
          color="#110022"
          emissive="#7722ff"
          emissiveIntensity={0.4}
          roughness={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>
      {/* PC power button LED */}
      <mesh position={[-0.75, 0.4, 0.11]}>
        <cylinderGeometry args={[0.008, 0.008, 0.005, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Headphone stand */}
      <mesh position={[-0.45, 0.38, 0.18]} castShadow>
        <cylinderGeometry args={[0.03, 0.04, 0.01, 8]} />
        <meshStandardMaterial color="#333333" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[-0.45, 0.44, 0.18]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.12, 8]} />
        <meshStandardMaterial color="#444444" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Headphones on stand */}
      <mesh position={[-0.45, 0.52, 0.18]} castShadow>
        <boxGeometry args={[0.14, 0.04, 0.08]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
      </mesh>
      {/* Headphone ear cups */}
      <mesh position={[-0.51, 0.50, 0.18]} castShadow>
        <boxGeometry args={[0.03, 0.07, 0.07]} />
        <meshStandardMaterial color="#222222" roughness={0.7} />
      </mesh>
      <mesh position={[-0.39, 0.50, 0.18]} castShadow>
        <boxGeometry args={[0.03, 0.07, 0.07]} />
        <meshStandardMaterial color="#222222" roughness={0.7} />
      </mesh>
    </group>
  )
}

// Gaming chair — rotation prop to face the desk
function GamingChair({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Chair base (5-star) */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i * Math.PI * 2) / 5
        return (
          <mesh key={i} position={[Math.sin(angle) * 0.18, 0.04, Math.cos(angle) * 0.18]} castShadow>
            <boxGeometry args={[0.04, 0.02, 0.18]} />
            <meshStandardMaterial color="#222222" roughness={0.5} metalness={0.3} />
          </mesh>
        )
      })}
      {/* Casters */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i * Math.PI * 2) / 5
        return (
          <mesh key={`c${i}`} position={[Math.sin(angle) * 0.25, 0.02, Math.cos(angle) * 0.25]} castShadow>
            <sphereGeometry args={[0.02, 6, 6]} />
            <meshStandardMaterial color="#111111" roughness={0.6} />
          </mesh>
        )
      })}
      {/* Gas cylinder */}
      <mesh position={[0, 0.14, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.03, 0.18, 8]} />
        <meshStandardMaterial color="#333333" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Seat */}
      <mesh position={[0, 0.26, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.38, 0.06, 0.38]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
      </mesh>
      {/* Seat accent stripe */}
      <mesh position={[0, 0.295, 0]}>
        <boxGeometry args={[0.08, 0.005, 0.36]} />
        <meshStandardMaterial color="#cc2233" roughness={0.6} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.52, -0.16]} castShadow>
        <boxGeometry args={[0.36, 0.46, 0.06]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
      </mesh>
      {/* Backrest accent stripes */}
      <mesh position={[0, 0.52, -0.125]}>
        <boxGeometry args={[0.08, 0.4, 0.005]} />
        <meshStandardMaterial color="#cc2233" roughness={0.6} />
      </mesh>
      {/* Headrest */}
      <mesh position={[0, 0.78, -0.16]} castShadow>
        <boxGeometry args={[0.2, 0.08, 0.08]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
      </mesh>
      {/* Armrests */}
      <mesh position={[-0.2, 0.34, 0]} castShadow>
        <boxGeometry args={[0.04, 0.1, 0.2]} />
        <meshStandardMaterial color="#222222" roughness={0.6} />
      </mesh>
      <mesh position={[0.2, 0.34, 0]} castShadow>
        <boxGeometry args={[0.04, 0.1, 0.2]} />
        <meshStandardMaterial color="#222222" roughness={0.6} />
      </mesh>
      {/* Armrest pads */}
      <mesh position={[-0.2, 0.4, 0]} castShadow>
        <boxGeometry args={[0.06, 0.02, 0.18]} />
        <meshStandardMaterial color="#333333" roughness={0.5} />
      </mesh>
      <mesh position={[0.2, 0.4, 0]} castShadow>
        <boxGeometry args={[0.06, 0.02, 0.18]} />
        <meshStandardMaterial color="#333333" roughness={0.5} />
      </mesh>
    </group>
  )
}

// Cozy rug under the setup
function Rug() {
  return (
    <mesh position={[-0.5, 0.005, 0.4]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[4.5, 3.2]} />
      <meshStandardMaterial color="#8b7355" roughness={0.95} side={THREE.DoubleSide} />
    </mesh>
  )
}

export default function CouchScene({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onBoundsReady,
  onPSPBoundsReady,
  on3DSBoundsReady,
}: CouchSceneProps) {
  const group = useRef<THREE.Group>(null)
  const boundsReported = useRef(false)

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
  }, [reportBounds])

  return (
    <group ref={group} position={position} rotation={rotation}>
      <Rug />
      {/* Couch area — center */}
      <Couch />
      <SideTable position={[1.2, 0, 0.1]} />
      {/* PSP on the side table (left side) */}
      <PSPModel
        position={[1.08, 0.66, 0.1]}
        rotation={[0, -0.5, 0]}
        onBoundsReady={onPSPBoundsReady}
      />
      {/* 3DS on the side table (right side) */}
      <Nintendo3DSModel
        position={[1.35, 0.66, 0.1]}
        rotation={[0, -0.3, 0]}
        onBoundsReady={on3DSBoundsReady}
      />
      {/* TV + console in front of the couch — further away */}
      <TVSetup position={[0, 0, 1.5]} />
      {/* Full bookshelf behind the couch, on the ground */}
      <Bookshelf position={[0, 0, -0.5]} />
      {/* PC gaming desk to the left of the couch — scaled up 1.4x */}
      <group position={[-1.8, 0, -0.2]} scale={1.4}>
        <PCGamingSetup position={[0, 0, 0]} />
      </group>
      {/* Gaming chair at the PC desk — rotated to face the desk (toward -Z) */}
      <GamingChair position={[-1.8, 0, 0.55]} rotation={[0, Math.PI, 0]} />
    </group>
  )
}
