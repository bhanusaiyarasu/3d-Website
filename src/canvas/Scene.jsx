import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { useGSAP } from '@gsap/react';

import FloatingIsland from './FloatingIsland';
import ParticleField from './ParticleField';
import ScrollRig from './ScrollRig';

export default function Scene({ scrollState }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]} // Performance: Limit pixel ratio on 4K/retina
      gl={{ 
        antialias: true,
        powerPreference: "high-performance",
        alpha: true 
      }}
      style={{ pointerEvents: 'none' }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
      
      {/* sharper, more defined lighting */}
      <ambientLight intensity={0.4} />
      <spotLight position={[15, 15, 15]} angle={0.2} penumbra={1} intensity={2.5} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={1.2} color="var(--neon-pink)" />
      <pointLight position={[10, 5, 5]} intensity={1.8} color="var(--neon-cyan)" />
      
      {/* Subtle fog for depth clarity */}
      <fog attach="fog" args={['#0a0e1a', 5, 20]} />

      <Suspense fallback={null}>
        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.4}>
          <FloatingIsland scrollState={scrollState} />
        </Float>
        
        <ParticleField />
        
        <Environment preset="city" />
        
        <ContactShadows 
          position={[0, -2, 0]} 
          opacity={0.3} 
          scale={10} 
          blur={1.5} 
          far={4.5} 
        />
      </Suspense>

      <ScrollRig scrollState={scrollState} />

      {/* Post-Processing optimization for clarity */}
      <EffectComposer disableNormalPass multisampling={4}>
        <Bloom 
          luminanceThreshold={1.2} 
          mipmapBlur 
          intensity={0.4} 
          radius={0.3} 
        />
        <ChromaticAberration offset={[0.0004, 0.0004]} />
        <Noise opacity={0.03} />
        <Vignette eskil={false} offset={0.15} darkness={1.2} />
      </EffectComposer>
    </Canvas>
  );
}
