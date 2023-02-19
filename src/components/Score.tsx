import { Center, Float, Text3D, useTexture } from '@react-three/drei';
import React from 'react';
import { useMainStore } from '../state/mainStore';

const Score = () => {
  const matcap = useTexture('/matcaps/736655_D9D8D5_2F281F_B1AEAB.png');
  const { score } = useMainStore();

  return (
    <React.Suspense fallback={null}>
      <Float floatIntensity={5} speed={2}>
        <Text3D
          font={'../public/fonts/Neuropol_Regular.json'}
          bevelEnabled
          bevelSize={0.05}
          letterSpacing={0.1}
          size={1}
          scale={1.5}
          position={[-24, 15, 0]}
          rotation={[-Math.PI / 5, 0, 0]}
        >
          Score: {score}
          <meshMatcapMaterial matcap={matcap} />
        </Text3D>
        <meshNormalMaterial />
      </Float>
    </React.Suspense>
  );
};

export default Score;
