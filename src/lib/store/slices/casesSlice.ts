import { StateCreator } from 'zustand';
import { supabase } from '../../supabase';
import type { Case } from '../types';

export interface CasesSlice {
  cases: Case[];
  loading: boolean;
  error: string | null;
  setCases: (cases: Case[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchCases: () => Promise<void>;
}

export const createCasesSlice: StateCreator<CasesSlice> = (set) => ({
  cases: [],
  loading: false,
  error: null,
  setCases: (cases) => set({ cases }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  fetchCases: async () => {
    try {
      set({ loading: true });
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      set({ cases: data || [], error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
});