import { MeshTransmissionMaterial } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group, Mesh } from 'three'
import { MathUtils } from 'three'

export function GlassLoop() {
  const group = useRef<Group>(null)
  const mesh = useRef<Mesh>(null)
  const { pointer, viewport } = useThree()

  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0, morph: 0 })

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime

    target.current.x = pointer.x * viewport.width * 0.08
    target.current.y = pointer.y * viewport.height * 0.06

    current.current.x = MathUtils.damp(current.current.x, target.current.x, 3.2, delta)
    current.current.y = MathUtils.damp(current.current.y, target.current.y, 3.2, delta)
    current.current.morph = MathUtils.damp(
      current.current.morph,
      Math.sin(t * 0.55) * 0.5 + 0.5,
      2.4,
      delta,
    )

    if (!group.current || !mesh.current) return

    group.current.position.x = current.current.x
    group.current.position.y = current.current.y * 0.35
    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      pointer.y * 0.35 + t * 0.12,
      2.8,
      delta,
    )
    group.current.rotation.y = MathUtils.damp(
      group.current.rotation.y,
      pointer.x * 0.55 + t * 0.22,
      2.8,
      delta,
    )
    group.current.rotation.z = t * 0.08

    const morph = current.current.morph
    mesh.current.scale.set(
      1 + morph * 0.12,
      1 - morph * 0.08,
      1 + Math.sin(t * 0.7) * 0.06,
    )
  })

  return (
    <group ref={group} position={[0, 0.15, 0]}>
      <mesh ref={mesh} castShadow>
        <torusKnotGeometry args={[1.05, 0.34, 220, 48, 2, 3]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          transmission={1}
          thickness={2}
          chromaticAberration={0.08}
          anisotropy={0.3}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.1}
          ior={1.45}
          color="#eef6ff"
          roughness={0.05}
          attenuationColor="#c9dff2"
          attenuationDistance={0.85}
        />
      </mesh>
    </group>
  )
}
