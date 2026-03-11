import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FloatingIsland({ scrollState }) {
  const groupRef = useRef();
  const islandRef = useRef(); // Reference for local rotation
  const glowRef = useRef();
  const orbitsRef = useRef();

  // Procedural island geometry with noise displacement
  const islandGeo = useMemo(() => {
    // Increased segments for maximum smoothness and clarity
    const geo = new THREE.CylinderGeometry(2.2, 1.6, 1.2, 64, 16);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const noise = Math.sin(x * 3) * Math.cos(z * 3) * 0.15;
      const topBulge = y > 0 ? Math.sin(x * 2 + z * 2) * 0.1 : 0;
      pos.setY(i, y + noise + topBulge);
      // Bottom stalactites
      if (y < -0.3) {
        const stalactite = Math.sin(x * 5 + z * 5) * 0.3 * Math.abs(y);
        pos.setY(i, y - Math.abs(stalactite));
      }
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Orbiting mini-objects data
  const orbitData = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      angle: (i / 8) * Math.PI * 2,
      radius: 3 + Math.random() * 1.5,
      speed: 0.15 + Math.random() * 0.15,
      y: (Math.random() - 0.5) * 2,
      scale: 0.08 + Math.random() * 0.12,
      color: ['#00f0ff', '#ff2d7b', '#a855f7', '#ffb7c5', '#fbbf24'][
        Math.floor(Math.random() * 5)
      ],
    }));
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const scrollProgress = scrollState?.progress || 0;

    if (groupRef.current) {
      // Orbital rotation and zoom
      groupRef.current.rotation.y = t * 0.05 + scrollProgress * Math.PI * 4;
      groupRef.current.position.y = Math.sin(t * 0.3) * 0.15;

      const zoomZ = THREE.MathUtils.lerp(0.5, -2, scrollProgress);
      groupRef.current.position.z = zoomZ;
    }

    if (islandRef.current) {
      // LOCAL ROTATION: The island spins on its own axis independently - INCREASED INTENSITY
      islandRef.current.rotation.y = t * 0.6 + scrollProgress * Math.PI * 4;
    }

    // Pulsing glow
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.2 + Math.sin(t * 1.5) * 0.08;
    }

    // Animate orbiting objects
    if (orbitsRef.current) {
      orbitsRef.current.children.forEach((child, i) => {
        const data = orbitData[i];
        if (!data) return;
        const angle = data.angle + t * data.speed;
        child.position.x = Math.cos(angle) * data.radius;
        child.position.z = Math.sin(angle) * data.radius;
        child.position.y = data.y + Math.sin(t * 0.8 + i) * 0.3;
        child.rotation.x = t * 0.5;
        child.rotation.z = t * 0.3;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main island body with LOCAL rotation ref */}
      <mesh ref={islandRef} geometry={islandGeo} castShadow receiveShadow>
        <meshStandardMaterial
          color="#1a1a2e"
          roughness={0.6}
          metalness={0.4}
          emissive="#0a0e1a"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Top surface with grass-like glow */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[2.1, 2.1, 0.1, 64]} />
        <meshStandardMaterial
          color="#102a43"
          roughness={0.8}
          emissive="#00f0ff"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Neon edge glow ring */}
      <mesh ref={glowRef} position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.15, 0.02, 16, 128]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.3} />
      </mesh>

      {/* Small structures on top */}
      {/* Tower 1 */}
      <mesh position={[-0.5, 1.1, 0.3]}>
        <boxGeometry args={[0.25, 0.8, 0.25]} />
        <meshStandardMaterial color="#16213e" emissive="#a855f7" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[-0.5, 1.55, 0.3]}>
        <coneGeometry args={[0.2, 0.3, 4]} />
        <meshStandardMaterial color="#ff2d7b" emissive="#ff2d7b" emissiveIntensity={0.5} />
      </mesh>

      {/* Tower 2 */}
      <mesh position={[0.7, 0.95, -0.4]}>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color="#16213e" emissive="#00f0ff" emissiveIntensity={0.3} />
      </mesh>

      {/* Tree-like structure */}
      <mesh position={[0, 0.9, 0.8]}>
        <cylinderGeometry args={[0.03, 0.05, 0.5, 12]} />
        <meshStandardMaterial color="#3d2b1f" />
      </mesh>
      <mesh position={[0, 1.25, 0.8]}>
        <sphereGeometry args={[0.25, 12, 12]} />
        <meshStandardMaterial
          color="#ffb7c5"
          emissive="#ffb7c5"
          emissiveIntensity={0.3}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Orbiting mini-objects */}
      <group ref={orbitsRef}>
        {orbitData.map((data, i) => (
          <mesh key={i} scale={data.scale}>
            {i % 3 === 0 ? (
              <octahedronGeometry args={[1]} />
            ) : i % 3 === 1 ? (
              <tetrahedronGeometry args={[1]} />
            ) : (
              <icosahedronGeometry args={[1]} />
            )}
            <meshStandardMaterial
              color={data.color}
              emissive={data.color}
              emissiveIntensity={0.4}
              wireframe={i % 2 === 0}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
