import { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';
import Contact from '../sections/Contact';

// Constellation of interconnected floating nodes
function ConstellationNodes() {
  const groupRef = useRef();
  const linesRef = useRef();

  const nodeData = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3
      ),
      speed: 0.2 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
      scale: 0.03 + Math.random() * 0.06,
      color: ['#00f0ff', '#ff2d7b', '#a855f7', '#ffb7c5', '#fbbf24'][i % 5],
    }));
  }, []);

  // Build line connections between nearby nodes
  const lineGeo = useMemo(() => {
    const positions = [];
    for (let i = 0; i < nodeData.length; i++) {
      for (let j = i + 1; j < nodeData.length; j++) {
        if (nodeData[i].pos.distanceTo(nodeData[j].pos) < 2.5) {
          positions.push(
            nodeData[i].pos.x, nodeData[i].pos.y, nodeData[i].pos.z,
            nodeData[j].pos.x, nodeData[j].pos.y, nodeData[j].pos.z
          );
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [nodeData]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05;
      groupRef.current.rotation.x = Math.sin(t * 0.03) * 0.1;
    }

    // Animate node positions
    groupRef.current?.children.forEach((child, i) => {
      if (i >= nodeData.length) return;
      const d = nodeData[i];
      child.position.x = d.pos.x + Math.sin(t * d.speed + d.offset) * 0.3;
      child.position.y = d.pos.y + Math.cos(t * d.speed * 0.7 + d.offset) * 0.2;
      child.position.z = d.pos.z + Math.sin(t * d.speed * 0.5 + d.offset * 2) * 0.15;
      
      // Pulse scale
      const pulse = 1 + Math.sin(t * 2 + i) * 0.3;
      child.scale.setScalar(d.scale * pulse);
    });

    // Update line positions
    if (linesRef.current) {
      const pos = linesRef.current.geometry.attributes.position;
      let idx = 0;
      for (let i = 0; i < nodeData.length; i++) {
        for (let j = i + 1; j < nodeData.length; j++) {
          if (nodeData[i].pos.distanceTo(nodeData[j].pos) < 2.5) {
            const ci = groupRef.current?.children[i];
            const cj = groupRef.current?.children[j];
            if (ci && cj) {
              pos.setXYZ(idx, ci.position.x, ci.position.y, ci.position.z);
              pos.setXYZ(idx + 1, cj.position.x, cj.position.y, cj.position.z);
            }
            idx += 2;
          }
        }
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <>
      <group ref={groupRef}>
        {nodeData.map((node, i) => (
          <mesh key={i} position={node.pos} scale={node.scale}>
            <sphereGeometry args={[1, 12, 12]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.8}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        ))}
      </group>
      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial color="#00f0ff" transparent opacity={0.15} />
      </lineSegments>
    </>
  );
}

function FloatingGeo() {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.x = t * 0.15;
      ref.current.rotation.y = t * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[0.6, 1]} />
        <MeshDistortMaterial
          color="#00f0ff"
          speed={3}
          distort={0.3}
          radius={1}
          emissive="#ff2d7b"
          emissiveIntensity={0.4}
          roughness={0}
          metalness={1}
          wireframe
        />
      </mesh>
    </Float>
  );
}

export default function ContactPage() {
  return (
    <div className="page-contact" style={{ paddingTop: '10vh', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="contact-canvas-container" style={{ height: '45vh', width: '100%', marginBottom: '-5vh' }}>
        <Canvas gl={{ antialias: true, alpha: true }}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#00f0ff" />
          <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ff2d7b" />
          <pointLight position={[0, 5, 5]} intensity={1} color="#a855f7" />
          
          <Suspense fallback={null}>
            <ConstellationNodes />
            <FloatingGeo />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

      <Contact />
      
      <section style={{ height: '10vh' }} />
    </div>
  );
}
