import { StateCreator } from 'zustand';
import { supabase } from '../../supabase';
import type { Client } from '../types';

export interface ClientsSlice {
  clients: Client[];
  loading: boolean;
  error: string | null;
  setClients: (clients: Client[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchClients: () => Promise<void>;
}

export const createClientsSlice: StateCreator<ClientsSlice> = (set) => ({
  clients: [],
  loading: false,
  error: null,
  setClients: (clients) => set({ clients }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  fetchClients: async () => {
    try {
      set({ loading: true });
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      set({ clients: data || [], error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
});