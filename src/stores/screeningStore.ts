import { create } from 'zustand';
import { SkriningSatu, RiwayatSkrining } from '@/types';

interface ScreeningStore {
  currentScreening: SkriningSatu | null;
  screeningHistory: RiwayatSkrining[];
  setCurrentScreening: (screening: SkriningSatu | null) => void;
  addToHistory: (screening: SkriningSatu) => void;
  setHistory: (history: RiwayatSkrining[]) => void;
  clearCurrent: () => void;
}

export const useScreeningStore = create<ScreeningStore>((set) => ({
  currentScreening: null,
  screeningHistory: [],
  setCurrentScreening: (screening) => set({ currentScreening: screening }),
  addToHistory: (screening) =>
    set((state) => ({
      screeningHistory: [...state.screeningHistory, { ...screening } as RiwayatSkrining],
    })),
  setHistory: (history) => set({ screeningHistory: history }),
  clearCurrent: () => set({ currentScreening: null }),
}));