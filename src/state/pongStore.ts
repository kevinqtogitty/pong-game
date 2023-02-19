import { clamp } from 'three/src/math/MathUtils';
import { create } from 'zustand';
import pingSound from '../resources/ping.mp3';

interface State {
  api: {
    pong: (velocity: number) => void;
    reset: (welcome: boolean) => void;
  };
  count: number;
  welcome: boolean;
}

const ping = new Audio(pingSound);
const usePongStore = create<State>((set) => ({
  api: {
    pong(velocity: number) {
      ping.currentTime = 0;
      ping.volume = clamp(velocity / 10, 1, 1);
      ping.play();
      if (velocity > 4) set((state) => ({ count: state.count + 1 }));
    },
    reset: (welcome) =>
      set((state) => ({ count: welcome ? state.count : 0, welcome }))
  },
  count: 0,
  welcome: true
}));

export { usePongStore };
