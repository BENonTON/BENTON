import { Environment, Lightformer, Sparkles } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { GlassLoop } from './GlassLoop'

function StudioLights() {
  return (
    <Environment resolution={256} background={false}>
      <group>
        <Lightformer
          form="rect"
          intensity={3.6}
          color="#ffffff"
          scale={[8, 1.2, 1]}
          position={[0, 4.5, -2]}
          rotation-x={Math.PI / 2}
        />
        <Lightformer
          form="rect"
          intensity={2.4}
          color="#9ec9e8"
          scale={[5, 0.8, 1]}
          position={[-4, 1.5, 2]}
          rotation-y={Math.PI / 3}
        />
        <Lightformer
          form="rect"
          intensity={2.1}
          color="#d4b483"
          scale={[4.5, 0.7, 1]}
          position={[4, -0.5, 1.5]}
          rotation-y={-Math.PI / 3}
        />
        <Lightformer
          form="ring"
          intensity={1.4}
          color="#ffffff"
          scale={3.2}
          position={[0, -2.5, -3]}
        />
      </group>
    </Environment>
  )
}

function SceneContents() {
  return (
    <>
      <color attach="background" args={['#030405']} />
      <ambientLight intensity={0.15} />
      <StudioLights />

      <Sparkles
        count={260}
        scale={[12, 8, 8]}
        size={2.4}
        speed={0.25}
        opacity={0.55}
        color="#f3e5c4"
        position={[0, 0, -1.5]}
      />
      <Sparkles
        count={140}
        scale={[9, 6, 6]}
        size={1.4}
        speed={0.35}
        opacity={0.4}
        color="#ffffff"
        position={[0, 0.2, -0.8]}
      />

      <GlassLoop />
    </>
  )
}

export function Scene() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Canvas
        className="!pointer-events-auto h-full w-full"
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 5.4], fov: 42, near: 0.1, far: 60 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <SceneContents />
        </Suspense>
      </Canvas>
    </div>
  )
}
