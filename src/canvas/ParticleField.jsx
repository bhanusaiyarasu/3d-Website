import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleField() {
  const meshRef = useRef();
  const mesh2Ref = useRef();
  const mesh3Ref = useRef();

  const count1 = 600;
  const count2 = 200;
  const count3 = 100;

  const data1 = useMemo(() => {
    const positions = new Float32Array(count1 * 3);
    const colors = new Float32Array(count1 * 3);
    const speeds = new Float32Array(count1);
    const offsets = new Float32Array(count1);
    const palette = [
      new THREE.Color('#00f0ff'),
      new THREE.Color('#ff2d7b'),
      new THREE.Color('#a855f7'),
      new THREE.Color('#ffb7c5'),
      new THREE.Color('#fbbf24'),
    ];
    for (let i = 0; i < count1; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      speeds[i]  = 0.05 + Math.random() * 0.2;
      offsets[i] = Math.random() * Math.PI * 2;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors, speeds, offsets };
  }, []);

  const geo1 = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(data1.positions, 3));
    g.setAttribute('color',    new THREE.BufferAttribute(data1.colors, 3));
    return g;
  }, [data1]);

  // Spiral ring of particles
  const data2 = useMemo(() => {
    const positions = new Float32Array(count2 * 3);
    const colors    = new Float32Array(count2 * 3);
    const palette = [new THREE.Color('#00f0ff'), new THREE.Color('#a855f7')];
    for (let i = 0; i < count2; i++) {
      const angle = (i / count2) * Math.PI * 8;
      const r     = 4 + (i / count2) * 3;
      positions[i * 3]     = Math.cos(angle) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = Math.sin(angle) * r;
      const c = palette[i % 2];
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  const geo2 = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(data2.positions, 3));
    g.setAttribute('color',    new THREE.BufferAttribute(data2.colors, 3));
    return g;
  }, [data2]);

  // Star-like background dust
  const data3 = useMemo(() => {
    const positions = new Float32Array(count3 * 3);
    for (let i = 0; i < count3; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 10;
    }
    return { positions };
  }, []);

  const geo3 = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(data3.positions, 3));
    return g;
  }, [data3]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Drift falling particles
    if (meshRef.current) {
      const pos = meshRef.current.geometry.attributes.position;
      for (let i = 0; i < count1; i++) {
        const offset = data1.offsets[i];
        const speed  = data1.speeds[i];
        pos.setX(i, pos.getX(i) + Math.sin(t * speed + offset) * 0.003);
        pos.setY(i, pos.getY(i) - speed * 0.006);
        pos.setZ(i, pos.getZ(i) + Math.cos(t * speed * 0.7 + offset) * 0.002);
        if (pos.getY(i) < -10) {
          pos.setY(i, 10);
          pos.setX(i, (Math.random() - 0.5) * 30);
          pos.setZ(i, (Math.random() - 0.5) * 20);
        }
      }
      pos.needsUpdate = true;
    }

    // Rotate spiral ring
    if (mesh2Ref.current) {
      mesh2Ref.current.rotation.y = t * 0.05;
      mesh2Ref.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }

    // Gently pulse stars
    if (mesh3Ref.current) {
      mesh3Ref.current.material.opacity = 0.3 + Math.sin(t * 0.5) * 0.15;
    }
  });

  return (
    <>
      {/* Main drifting colored particles */}
      <points ref={meshRef} geometry={geo1}>
        <pointsMaterial
          size={0.07}
          vertexColors
          transparent
          opacity={0.75}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Spiral ring */}
      <points ref={mesh2Ref} geometry={geo2}>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.5}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Background star dust */}
      <points ref={mesh3Ref} geometry={geo3}>
        <pointsMaterial
          size={0.04}
          color="#ffffff"
          transparent
          opacity={0.35}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </>
  );
}
