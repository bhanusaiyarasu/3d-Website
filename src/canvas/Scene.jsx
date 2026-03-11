import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { useGSAP } from '@gsap/react';

import FloatingIsland from './FloatingIsland';
import ParticleField from './ParticleField';
import ScrollRig from './ScrollRig';

export default function Scene({ scrollProgress }) {
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
      
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={1} color="var(--neon-pink)" />
      <pointLight position={[10, 5, 5]} intensity={1.5} color="var(--neon-cyan)" />

      <Suspense fallback={null}>
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <FloatingIsland scrollProgress={scrollProgress} />
        </Float>
        
        <ParticleField />
        
        <Environment preset="night" />
        
        <ContactShadows 
          position={[0, -2, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2} 
          far={4.5} 
        />
      </Suspense>

      <ScrollRig scrollProgress={scrollProgress} />

      {/* Post-Processing */}
      <EffectComposer disableNormalPass>
        <Bloom 
          luminanceThreshold={1} 
          mipmapBlur 
          intensity={0.5} 
          radius={0.4} 
        />
        <ChromaticAberration offset={[0.0005, 0.0005]} />
        <Noise opacity={0.05} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </Canvas>
  );
}
