import { usePlane, useSphere } from '@react-three/cannon';
import { useThree } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import { PaddleProps } from './Paddle';
interface PingPongBallProps extends PaddleProps {}

export const PingPongBall: React.FC<PingPongBallProps> = ({
  args = [1.5, 512, 512],
  handleScoreChange
}) => {
  const [isResettable, setIsResettable] = useState(false);
  const { viewport } = useThree();
  useEffect(() => {
    document.addEventListener('keydown', resetPosition);
    return () => document.removeEventListener('keydown', resetPosition);
  });

  const [ref, api] = useSphere(() => ({
    args,
    mass: 5,
    position: [0, 10, 0]
  }));

  const resetPosition = (e: KeyboardEvent) => {
    if (isResettable && e.code === 'Space') {
      api.position.set(0, 10, 0);
      setIsResettable(false);
    } else {
      return;
    }
  };

  usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -viewport.height, 0],
    onCollide: () => {
      handleScoreChange('-');
      api.velocity.set(0, 0, 0);
      setIsResettable(true);
    }
  }));

  return (
    <mesh ref={ref} scale={1}>
      <sphereBufferGeometry args={[1.5, 512, 512]} />
      <meshStandardMaterial color={'#fff'} />
    </mesh>
  );
};
