import {create} from "zustand";

interface FlockState {
  totalBirds: number;
  setTotalBirds: (total: number) => void;
}

export const useFlockStore = create<FlockState>((set) => ({
  totalBirds: 0,
  setTotalBirds: (total) => set({ totalBirds: total }),
}));