import { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Float, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';

import FloatingIsland from './FloatingIsland';
import ParticleField from './ParticleField';
import ScrollRig from './ScrollRig';

// Mouse-parallax camera movement
function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useFrame(() => {
    // Smoothly approach target
    target.current.x += (mouse.current.x - target.current.x) * 0.02;
    target.current.y += (mouse.current.y - target.current.y) * 0.02;
    
    camera.position.x = target.current.x * 0.8;
    camera.position.y = target.current.y * 0.4;
    camera.lookAt(0, 0, 0);
  });

  // Listen to mouse events
  useFrame(({ pointer }) => {
    mouse.current.x = pointer.x;
    mouse.current.y = pointer.y;
  });

  return null;
}

// Nebula ring rotating slowly in the background
function NebulaRing() {
  const ref = useRef();
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.z = t * 0.02;
      ref.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.05) * 0.1;
      ref.current.material.opacity = 0.06 + Math.sin(t * 0.3) * 0.02;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, -5]}>
      <torusGeometry args={[8, 2.5, 4, 120]} />
      <meshBasicMaterial
        color="#a855f7"
        transparent
        opacity={0.06}
        wireframe
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function Scene({ scrollState }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ 
        antialias: true,
        powerPreference: "high-performance",
        alpha: true 
      }}
      style={{ pointerEvents: 'none' }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
      <CameraRig />
      
      {/* Richer lighting setup */}
      <ambientLight intensity={0.35} />
      <spotLight position={[15, 15, 15]} angle={0.2} penumbra={1} intensity={2.8} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={1.4} color="#ff2d7b" />
      <pointLight position={[10, 5, 5]} intensity={2.0} color="#00f0ff" />
      <pointLight position={[0, 8, 0]} intensity={0.8} color="#a855f7" />
      
      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0e1a', 5, 22]} />

      <Suspense fallback={null}>
        <Float speed={1.0} rotationIntensity={0.3} floatIntensity={0.5}>
          <FloatingIsland scrollState={scrollState} />
        </Float>
        
        <ParticleField />
        <NebulaRing />
        
        <Environment preset="city" />
        
        <ContactShadows 
          position={[0, -2, 0]} 
          opacity={0.35} 
          scale={12} 
          blur={2} 
          far={5} 
        />
      </Suspense>

      <ScrollRig scrollState={scrollState} />

      {/* Enhanced post-processing */}
      <EffectComposer disableNormalPass multisampling={4}>
        <Bloom 
          luminanceThreshold={0.9} 
          mipmapBlur 
          intensity={0.6} 
          radius={0.4} 
        />
        <ChromaticAberration offset={[0.0005, 0.0005]} />
        <Noise opacity={0.035} />
        <Vignette eskil={false} offset={0.15} darkness={1.3} />
      </EffectComposer>
    </Canvas>
  );
}
