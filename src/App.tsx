import React, { useEffect, useRef, useState } from 'react';
import {
  Center,
  Environment,
  Float,
  Html,
  Lightformer,
  OrbitControls,
  Stars,
  Text3D,
  useTexture
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Paddle } from './components/Paddle';
import { Debug, Physics } from '@react-three/cannon';
import { PingPongBall } from './components/PingPongBall';
import { useMainStore } from './state/mainStore';
import Score from './components/Score';
import Restart from './components/Restart';

function App() {
  const ThreeScene = () => {
    const { setScore } = useMainStore();
    const handleScoreChange = (calculationKey: string) => {
      setScore(calculationKey);
    };

    return (
      <Canvas camera={{ position: [0, 20, 30], fov: 70 }}>
        {/* Lights */}
        <ambientLight />
        <directionalLight position={[-3, 3, 1]} color="#f3e99b" intensity={2} />
        <hemisphereLight />
        {/* Environment */}
        <Stars />
        {/* Text */}
        <Score />
        <Restart />
        {/* Objects */}
        <Physics
          gravity={[0, -80, 0]}
          defaultContactMaterial={{ restitution: 1.07 }}
        >
          <PingPongBall handleScoreChange={handleScoreChange} />
          <Paddle handleScoreChange={handleScoreChange} />
        </Physics>
      </Canvas>
    );
  };

  return (
    <div className="canvasFulLScreened">
      <ThreeScene />
    </div>
  );
}

export default App;
