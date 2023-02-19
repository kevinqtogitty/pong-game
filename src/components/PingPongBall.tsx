import { usePlane, useSphere } from '@react-three/cannon';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import { useMainStore } from '../state/mainStore';
import { PaddleProps } from './Paddle';
interface PingPongBallProps extends PaddleProps {}

export const PingPongBall: React.FC<PingPongBallProps> = ({
  args = [1.5, 512, 512],
  handleScoreChange
}) => {
  const {
    setTries,
    setIsResettable,
    isResettable,
    setIsGameOver,
    setHasStarted
  } = useMainStore();

  const { viewport } = useThree();

  useEffect(() => {
    document.addEventListener('keydown', resetPosition);
    return () => document.removeEventListener('keydown', resetPosition);
  });

  const resetPosition = (e: KeyboardEvent) => {
    if (isResettable && e.code === 'Space') {
      api.position.set(0, 10, 0);
      handleScoreChange('-');
      setIsResettable();
      setTries();
      setIsGameOver(false);
      setHasStarted();
    } else {
      return;
    }
  };

  usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -viewport.height - viewport.height / 2, 0],
    onCollide: () => {
      api.velocity.set(0, 0, 0);
      setIsResettable();
      setIsGameOver(true);
    }
  }));

  const [ref, api] = useSphere(() => ({
    args: [1.5],
    mass: 50,
    position: [0, -viewport.height - viewport.height / 2, 0]
  }));

  return (
    <mesh scale={1} receiveShadow castShadow ref={ref}>
      <sphereBufferGeometry args={[1.5, 512, 512]} />
      <meshStandardMaterial color={'#fff'} />
    </mesh>
  );
};
