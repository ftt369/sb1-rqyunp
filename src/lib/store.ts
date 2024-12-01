import { create } from 'zustand';
import { supabase } from './supabase';
import type { Database } from './supabase-types';

type User = Database['public']['Tables']['users']['Row'];
type Case = Database['public']['Tables']['cases']['Row'];
type Client = Database['public']['Tables']['clients']['Row'];
type Document = Database['public']['Tables']['documents']['Row'];

interface AppState {
  user: User | null;
  cases: Case[];
  clients: Client[];
  documents: Document[];
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setCases: (cases: Case[]) => void;
  setClients: (clients: Client[]) => void;
  setDocuments: (documents: Document[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchCases: () => Promise<void>;
  fetchClients: () => Promise<void>;
  fetchDocuments: () => Promise<void>;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  cases: [],
  clients: [],
  documents: [],
  loading: false,
  error: null,
  setUser: (user) => set({ user }),
  setCases: (cases) => set({ cases }),
  setClients: (clients) => set({ clients }),
  setDocuments: (documents) => set({ documents }),
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

  fetchDocuments: async () => {
    try {
      set({ loading: true });
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      set({ documents: data || [], error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
}));