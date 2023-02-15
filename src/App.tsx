import React, { useRef, useState } from 'react';
import { Environment, Html, OrbitControls, Stars } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Mesh } from 'three';
import { useControls, folder } from 'leva';
import { Paddle } from './components/Paddle';
import {
  Debug,
  Physics,
  useBox,
  usePlane,
  useSphere
} from '@react-three/cannon';
import { PingPongBall } from './components/PingPongBall';

function App() {
  const ThreeScene = () => {
    const [score, setScore] = useState(0);
    const handleScoreChange = (calculationKey: string) => {
      calculationKey === '+' ? setScore((state) => state + 1) : setScore(0);
    };
    return (
      <Canvas camera={{ position: [0, 20, 30], fov: 70 }}>
        {/**
         * Cameras
         */}

        {/**
         * Lights
         */}
        <ambientLight />
        <directionalLight position={[3, 3, 1]} color="#f3e99b" intensity={2} />

        {/**
         * Controls
         */}
        {/* <OrbitControls /> */}

        {/**
         * Helpers
         */}

        {/**
         * Environment
         */}
        {/* <Stars /> */}
        <Environment background preset="dawn" blur={0.8} />

        {/**
         * Objects
         */}
        <Physics
          gravity={[0, -80, 0]}
          defaultContactMaterial={{ restitution: 1.07 }}
        >
          {/* <Debug color="red" scale={1}> */}
          <PingPongBall handleScoreChange={handleScoreChange} />
          {/* <Box /> */}

          <Paddle handleScoreChange={handleScoreChange} />
          {/* <BallCatchPlane /> */}
          {/* </Debug> */}
        </Physics>
        <Html fullscreen className="three-html">
          Score: {score}
        </Html>
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
