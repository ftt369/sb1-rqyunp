import { StateCreator } from 'zustand';
import type { User } from '../types';

export interface AuthSlice {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
});