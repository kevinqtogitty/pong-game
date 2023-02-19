import { Text3D, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useRef } from 'react';
import { useMainStore } from '../state/mainStore';
import { Mesh } from 'three';

const Restart = () => {
  const matcap = useTexture('/matcaps/736655_D9D8D5_2F281F_B1AEAB.png');
  const ref = useRef<Mesh>(null!);
  const { viewport } = useThree();
  const { hasStarted } = useMainStore();

  useFrame(() => {
    ref.current.position.x = viewport.width / 2;
    ref.current.position.y = THREE.MathUtils.lerp(
      ref.current.position.y,
      hasStarted ? -40 : viewport.height * 1.2,
      hasStarted ? 0.02 : 0.05
    );
  });

  return (
    <React.Suspense fallback={null}>
      <mesh ref={ref}>
        <Text3D
          font={'/fonts/Neuropol_Regular.json'}
          bevelEnabled
          bevelSize={0.05}
          letterSpacing={0.1}
          size={1.2}
          scale={1}
          position={[-viewport.width + viewport.width / 5, -viewport.height, 0]}
          rotation={[-Math.PI / 5, 0, 0]}
        >
          Hit spacebar to reset/start the ping pong ball
          <meshMatcapMaterial matcap={matcap} />
        </Text3D>
      </mesh>
    </React.Suspense>
  );
};

export default Restart;
