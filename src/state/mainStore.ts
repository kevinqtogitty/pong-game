import create from 'zustand';

interface MainStore {
  hasStarted: boolean;
  setHasStarted: () => void;
  isResettable: boolean;
  setIsResettable: () => void;
  isGameOver: boolean;
  setIsGameOver: (isOver: boolean) => void;
  score: number;
  setScore: (calculationKey: string) => void;
  tries: number;
  setTries: () => void;
}

const useMainStore = create<MainStore>((set) => ({
  hasStarted: false,
  setHasStarted: () => set({ hasStarted: true }),
  isResettable: false,
  setIsResettable: () =>
    set(({ isResettable }) => ({ isResettable: !isResettable })),
  isGameOver: false,
  setIsGameOver: (isOver) => set({ isGameOver: isOver }),
  score: 0,
  setScore: (calculationKey) => {
    calculationKey === '+'
      ? set(({ score }) => ({ score: score + 1 }))
      : set({ score: 0 });
  },
  tries: 0,
  setTries: () => set(({ tries }) => ({ tries: tries + 1 }))
}));

export { useMainStore };
