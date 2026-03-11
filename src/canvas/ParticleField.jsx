import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleField() {
  const meshRef = useRef();

  const { positions, speeds, offsets } = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const offsets = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Spread particles in a large volume
      positions[i * 3] = (Math.random() - 0.5) * 20;      // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;  // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;  // z
      speeds[i] = 0.1 + Math.random() * 0.3;
      offsets[i] = Math.random() * Math.PI * 2;
    }

    return { positions, speeds, offsets };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pos = meshRef.current?.geometry?.attributes?.position;
    if (!pos) return;

    for (let i = 0; i < pos.count; i++) {
      const offset = offsets[i];
      const speed = speeds[i];

      // Gentle sine-wave drift (sakura petal floating)
      pos.setX(i, pos.getX(i) + Math.sin(t * speed + offset) * 0.002);
      pos.setY(i, pos.getY(i) - speed * 0.008); // Fall downward
      pos.setZ(i, pos.getZ(i) + Math.cos(t * speed * 0.7 + offset) * 0.001);

      // Reset particles that fall below
      if (pos.getY(i) < -8) {
        pos.setY(i, 8);
        pos.setX(i, (Math.random() - 0.5) * 20);
        pos.setZ(i, (Math.random() - 0.5) * 15);
      }
    }

    pos.needsUpdate = true;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.06}
        color="#ffb7c5"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
