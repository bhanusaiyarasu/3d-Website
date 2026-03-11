import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function ScrollRig({ scrollState }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 2, 8));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    // Define camera path based on scroll
    const scrollProgress = scrollState?.progress || 0;
    const t = scrollProgress;

    // Camera spirals around and zooms in as user scrolls - SUPERCHARGED
    const angle = t * Math.PI * 3.5;
    const radius = THREE.MathUtils.lerp(8, 2.5, t);
    const height = THREE.MathUtils.lerp(3, 1.5, Math.min(t * 2, 1));

    targetPos.current.set(
      Math.sin(angle) * radius,
      height,
      Math.cos(angle) * radius
    );

    // Smooth interpolation
    camera.position.lerp(targetPos.current, 0.03);
    
    // Look at center with slight offset based on scroll
    targetLookAt.current.set(0, THREE.MathUtils.lerp(0.5, -0.5, t), 0);
    const lookAtPos = new THREE.Vector3().lerpVectors(
      camera.position,
      targetLookAt.current,
      1
    );
    camera.lookAt(targetLookAt.current);
  });

  return null;
}
