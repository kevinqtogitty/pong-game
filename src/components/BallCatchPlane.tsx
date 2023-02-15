import { usePlane } from '@react-three/cannon';

export const BallCatchPlane = () => {
  const [ref, api] = usePlane(() => ({
    args: [100, 100, 100],
    onCollide: () => console.log('caught')
  }));
  return (
    <mesh>
      <planeBufferGeometry />
      <meshStandardMaterial />
    </mesh>
  );
};
