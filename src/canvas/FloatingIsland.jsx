import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FloatingIsland({ scrollState }) {
  const groupRef    = useRef();
  const islandRef   = useRef();
  const glowRef     = useRef();
  const ring1Ref    = useRef();
  const ring2Ref    = useRef();
  const ring3Ref    = useRef();
  const domeRef     = useRef();
  const orbitsRef   = useRef();
  const crystalsRef = useRef();
  const energyRef   = useRef();

  // Main island geometry with noise displacement
  const islandGeo = useMemo(() => {
    const geo = new THREE.CylinderGeometry(2.4, 1.8, 1.4, 80, 20);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const noise = Math.sin(x * 3.5) * Math.cos(z * 3.5) * 0.18;
      const topBulge = y > 0 ? Math.sin(x * 2.5 + z * 2.5) * 0.12 : 0;
      pos.setY(i, y + noise + topBulge);
      if (y < -0.3) {
        const stalactite = Math.sin(x * 5 + z * 5) * 0.35 * Math.abs(y);
        pos.setY(i, pos.getY(i) - Math.abs(stalactite));
      }
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Orbiting mini-objects (more of them!)
  const orbitData = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      angle:  (i / 12) * Math.PI * 2,
      radius: 3.5 + Math.random() * 2,
      speed:  0.12 + Math.random() * 0.18,
      y:      (Math.random() - 0.5) * 2.5,
      scale:  0.06 + Math.random() * 0.14,
      color:  ['#00f0ff','#ff2d7b','#a855f7','#ffb7c5','#fbbf24','#00ff9f'][Math.floor(Math.random() * 6)],
    }));
  }, []);

  // Crystal positions on top of island
  const crystalData = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const angle = (i / 6) * Math.PI * 2;
      return {
        x: Math.cos(angle) * 1.3,
        z: Math.sin(angle) * 1.3,
        scale: 0.12 + Math.random() * 0.18,
        color: ['#00f0ff','#ff2d7b','#a855f7'][i % 3],
      };
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const scroll = scrollState?.progress || 0;

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.04 + scroll * Math.PI * 3;
      groupRef.current.position.y = Math.sin(t * 0.25) * 0.2;
      const zoomZ = THREE.MathUtils.lerp(0.5, -2.5, scroll);
      groupRef.current.position.z = zoomZ;
    }

    if (islandRef.current) {
      islandRef.current.rotation.y = t * 0.5 + scroll * Math.PI * 4;
    }

    // Pulsing outer glow ring
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.25 + Math.sin(t * 2) * 0.12;
    }

    // Energy rings ascend and loop
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.4;
      ring1Ref.current.material.opacity = 0.15 + Math.sin(t * 1.5) * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = t * 0.3;
      ring2Ref.current.rotation.z = -t * 0.2;
      ring2Ref.current.material.opacity = 0.12 + Math.sin(t * 1.2 + 1) * 0.08;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = t * 0.6;
      ring3Ref.current.material.opacity = 0.1 + Math.sin(t * 1.8 + 2) * 0.06;
    }

    // Holographic dome pulse
    if (domeRef.current) {
      domeRef.current.material.opacity = 0.04 + Math.sin(t * 0.8) * 0.02;
    }

    // Energy column
    if (energyRef.current) {
      energyRef.current.material.opacity = 0.3 + Math.sin(t * 3) * 0.2;
      energyRef.current.scale.y = 1 + Math.sin(t * 2) * 0.1;
    }

    // Orbiting objects
    if (orbitsRef.current) {
      orbitsRef.current.children.forEach((child, i) => {
        const d = orbitData[i];
        if (!d) return;
        const angle = d.angle + t * d.speed;
        child.position.x = Math.cos(angle) * d.radius;
        child.position.z = Math.sin(angle) * d.radius;
        child.position.y = d.y + Math.sin(t * 0.6 + i) * 0.35;
        child.rotation.x = t * 0.4;
        child.rotation.z = t * 0.25;
      });
    }

    // Crystal pulse
    if (crystalsRef.current) {
      crystalsRef.current.children.forEach((child, i) => {
        child.material.emissiveIntensity = 0.4 + Math.sin(t * 1.5 + i * 0.8) * 0.3;
        child.scale.y = 1 + Math.sin(t * 2 + i) * 0.08;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main island body */}
      <mesh ref={islandRef} geometry={islandGeo} castShadow receiveShadow>
        <meshStandardMaterial
          color="#1a1a2e"
          roughness={0.5}
          metalness={0.5}
          emissive="#0d1b36"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Top glowing surface */}
      <mesh position={[0, 0.62, 0]}>
        <cylinderGeometry args={[2.3, 2.3, 0.08, 80]} />
        <meshStandardMaterial
          color="#0a1f3a"
          roughness={0.6}
          emissive="#00f0ff"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Neon edge glow ring */}
      <mesh ref={glowRef} position={[0, 0.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.35, 0.025, 16, 128]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.35} />
      </mesh>

      {/* Energy rising column */}
      <mesh ref={energyRef} position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 3, 8]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.4} />
      </mesh>

      {/* Floating energy rings at different heights */}
      <mesh ref={ring1Ref} position={[0, 1.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.015, 12, 100]} />
        <meshBasicMaterial color="#ff2d7b" transparent opacity={0.2} />
      </mesh>
      <mesh ref={ring2Ref} position={[0, 1.8, 0]}>
        <torusGeometry args={[1.0, 0.01, 12, 80]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.15} />
      </mesh>
      <mesh ref={ring3Ref} position={[0, 2.4, 0]} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.6, 0.008, 12, 60]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.12} />
      </mesh>

      {/* Holographic dome */}
      <mesh ref={domeRef} position={[0, 0.8, 0]}>
        <sphereGeometry args={[2.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
          wireframe
        />
      </mesh>

      {/* Crystals on island surface */}
      <group ref={crystalsRef}>
        {crystalData.map((crystal, i) => (
          <mesh key={i} position={[crystal.x, 0.8, crystal.z]} scale={[crystal.scale, crystal.scale * 2.5, crystal.scale]}>
            <octahedronGeometry args={[1]} />
            <meshStandardMaterial
              color={crystal.color}
              emissive={crystal.color}
              emissiveIntensity={0.5}
              transparent
              opacity={0.9}
              roughness={0.1}
              metalness={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* Tower structures */}
      <mesh position={[-0.6, 1.2, 0.4]}>
        <boxGeometry args={[0.22, 1.0, 0.22]} />
        <meshStandardMaterial color="#16213e" emissive="#a855f7" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[-0.6, 1.75, 0.4]}>
        <coneGeometry args={[0.18, 0.35, 4]} />
        <meshStandardMaterial color="#ff2d7b" emissive="#ff2d7b" emissiveIntensity={0.7} />
      </mesh>

      <mesh position={[0.8, 1.05, -0.5]}>
        <boxGeometry args={[0.18, 0.7, 0.18]} />
        <meshStandardMaterial color="#16213e" emissive="#00f0ff" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0.8, 1.45, -0.5]}>
        <coneGeometry args={[0.14, 0.28, 4]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.7} />
      </mesh>

      {/* Sakura tree */}
      <mesh position={[0.1, 0.95, 0.9]}>
        <cylinderGeometry args={[0.03, 0.06, 0.55, 12]} />
        <meshStandardMaterial color="#3d2b1f" />
      </mesh>
      <mesh position={[0.1, 1.35, 0.9]}>
        <sphereGeometry args={[0.28, 12, 12]} />
        <meshStandardMaterial
          color="#ffb7c5"
          emissive="#ffb7c5"
          emissiveIntensity={0.4}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Orbiting mini-objects */}
      <group ref={orbitsRef}>
        {orbitData.map((d, i) => (
          <mesh key={i} scale={d.scale}>
            {i % 4 === 0 ? <octahedronGeometry args={[1]} />
              : i % 4 === 1 ? <tetrahedronGeometry args={[1]} />
              : i % 4 === 2 ? <icosahedronGeometry args={[1]} />
              : <boxGeometry args={[1, 1, 1]} />}
            <meshStandardMaterial
              color={d.color}
              emissive={d.color}
              emissiveIntensity={0.6}
              wireframe={i % 2 === 0}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
