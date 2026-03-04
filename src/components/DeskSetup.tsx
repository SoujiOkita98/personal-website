import { RoundedBox } from '@react-three/drei'

const DESK_W = 1.6
const DESK_D = 0.8
const DESK_H = 0.04
const DESK_Y = 0.72
const LEG_H = DESK_Y - DESK_H / 2
const LEG_INSET = 0.06

const deskColor = '#4a4a4a'
const legColor = '#3e3e3e'

export default function DeskSetup() {
  return (
    <group>
      {/* Desk surface */}
      <RoundedBox
        args={[DESK_W, DESK_H, DESK_D]}
        radius={0.008}
        smoothness={4}
        position={[0, DESK_Y, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={deskColor} roughness={0.5} metalness={0.15} />
      </RoundedBox>

      {/* Left panel leg */}
      <RoundedBox
        args={[0.04, LEG_H, DESK_D - LEG_INSET * 2]}
        radius={0.006}
        smoothness={4}
        position={[-(DESK_W / 2 - 0.04), LEG_H / 2, 0]}
        castShadow
      >
        <meshStandardMaterial color={legColor} roughness={0.5} metalness={0.15} />
      </RoundedBox>

      {/* Right panel leg */}
      <RoundedBox
        args={[0.04, LEG_H, DESK_D - LEG_INSET * 2]}
        radius={0.006}
        smoothness={4}
        position={[DESK_W / 2 - 0.04, LEG_H / 2, 0]}
        castShadow
      >
        <meshStandardMaterial color={legColor} roughness={0.5} metalness={0.15} />
      </RoundedBox>
    </group>
  )
}
