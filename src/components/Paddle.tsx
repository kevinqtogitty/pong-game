/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 public/models/ping_pong_paddle_scanned_with_academia_50/scene.gltf -t -r -public
Author: Creaform 3D (https://sketchfab.com/creaform)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/ping-pong-paddle-scanned-with-academia-50-43565fda2deb470fbe86e5561a2e1e4e
Title: Ping pong Paddle scanned with ACADEMIA 50
*/

import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { useFrame } from '@react-three/fiber';
import { useBox, usePlane } from '@react-three/cannon';

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh;
    Object_3: THREE.Mesh;
    Object_4: THREE.Mesh;
    Object_5: THREE.Mesh;
    Object_6: THREE.Mesh;
  };
  materials: {
    material: THREE.MeshStandardMaterial;
  };
};

export function Paddle({ args = [0.5, 8, 8.5] }) {
  const { nodes, materials } = useGLTF(
    '/scene-transformed.glb'
  ) as unknown as GLTFResult;
  const [ref, api] = useBox(() => ({
    args,
    mass: 0,
    rotation: [0, 0, Math.PI / 2],
    onCollide: () => {
      console.log('hit');
    }
  }));
  useFrame((state) => {
    api.position.set((state.mouse.x * state.viewport.width) / 2, 0, 0);
    api.rotation.set(0, 0, -Math.PI / 2 + state.mouse.x / 2);
  });
  return (
    <group dispose={null} scale={0.05} ref={ref}>
      <group position={[-1, 0, 180]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <mesh
          geometry={nodes.Object_2.geometry}
          material={materials.material}
        />
        <mesh
          geometry={nodes.Object_3.geometry}
          material={materials.material}
        />
        <mesh
          geometry={nodes.Object_4.geometry}
          material={materials.material}
        />
        <mesh
          geometry={nodes.Object_5.geometry}
          material={materials.material}
        />
        <mesh
          geometry={nodes.Object_6.geometry}
          material={materials.material}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/scene-transformed.glb');