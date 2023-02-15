import React, { useRef } from 'react';
import { OrbitControls, Stars } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { useControls, folder } from 'leva';
import { Paddle } from './components/Paddle';
import { Debug, Physics, useBox, useSphere } from '@react-three/cannon';

function App() {
  const BasicSphere = ({ args = [1.5, 512, 512] }) => {
    const basicSphereRef = useRef<Mesh>(null!);
    const [ref, api] = useSphere(() => ({
      args,
      mass: 5,
      position: [0, 10, 0]
    }));

    // GUI
    const { scale, color, wireframe } = useControls('Box', {
      transform: folder({
        scale: 1
      }),
      material: folder({
        color: '#fff'
      })
    });

    return (
      <mesh ref={ref} scale={scale}>
        <sphereBufferGeometry args={[1.5, 512, 512]} />
        <meshStandardMaterial color={color} wireframe={wireframe} />
      </mesh>
    );
  };

  const ThreeScene = () => {
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
        <Stars />

        {/**
         * Objects
         */}
        <Physics
          gravity={[0, -80, 0]}
          defaultContactMaterial={{ restitution: 1.07 }}
        >
          {/* <Debug color="red" scale={1}> */}
          <BasicSphere />
          {/* <Box /> */}

          <Paddle />
          {/* </Debug> */}
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
