import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import FloatingIsland from './FloatingIsland';
import ParticleField from './ParticleField';
import ScrollRig from './ScrollRig';

export default function Scene({ scrollProgress = 0 }) {
  return (
    <Canvas
      camera={{ position: [0, 3, 8], fov: 45, near: 0.1, far: 100 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.15} color="#e0e0ff" />
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.6}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      {/* Neon point lights */}
      <pointLight position={[-3, 2, 3]} intensity={2} color="#00f0ff" distance={12} decay={2} />
      <pointLight position={[3, 1, -3]} intensity={1.5} color="#ff2d7b" distance={10} decay={2} />
      <pointLight position={[0, 4, 0]} intensity={1} color="#a855f7" distance={8} decay={2} />

      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0e1a', 8, 25]} />

      {/* 3D Scene Objects */}
      <FloatingIsland scrollProgress={scrollProgress} />
      <ParticleField />
      <ScrollRig scrollProgress={scrollProgress} />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0005, 0.0005]}
        />
      </EffectComposer>
    </Canvas>
  );
}
