import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, MeshDistortMaterial, Sphere, Environment } from '@react-three/drei';
import * as THREE from 'three';
import Contact from '../sections/Contact';

function InteractiveShape() {
  const meshRef = useRef();
  const mouse = useRef(new THREE.Vector2());

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    // Smoothly follow mouse
    mouse.current.lerp(new THREE.Vector2(state.mouse.x * 2, state.mouse.y * 2), 0.1);

    if (meshRef.current) {
      meshRef.current.rotation.x = Math.cos(t / 4) / 2 + mouse.current.y * 0.5;
      meshRef.current.rotation.y = Math.sin(t / 4) / 2 + mouse.current.x * 0.5;
      meshRef.current.rotation.z = Math.sin(t / 1.5) / 10;
      meshRef.current.position.y = Math.sin(t / 1.5) / 10 + mouse.current.y * 0.2;
      meshRef.current.position.x = mouse.current.x * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1.2, 0]} />
        <MeshDistortMaterial
          color="#00f0ff"
          speed={3}
          distort={0.4}
          radius={1}
          emissive="#ff2d7b"
          emissiveIntensity={0.6}
          roughness={0}
          metalness={1}
        />
      </mesh>
    </Float>
  );
}


export default function ContactPage() {
  return (
    <div className="page-contact" style={{ paddingTop: '10vh', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="contact-canvas-container" style={{ height: '40vh', width: '100%', marginBottom: '-5vh' }}>
        <Canvas gl={{ antialias: true, alpha: true }}>
          <PerspectiveCamera makeDefault position={[0, 0, 4]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#00f0ff" />
          <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ff2d7b" />
          
          <Suspense fallback={null}>
            <InteractiveShape />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

      <Contact />
      
      <section style={{ height: '10vh' }} />
    </div>
  );
}
