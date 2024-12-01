import { StateCreator } from 'zustand';
import { supabase } from '../../supabase';
import type { Document } from '../types';

export interface DocumentsSlice {
  documents: Document[];
  loading: boolean;
  error: string | null;
  setDocuments: (documents: Document[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchDocuments: () => Promise<void>;
}

export const createDocumentsSlice: StateCreator<DocumentsSlice> = (set) => ({
  documents: [],
  loading: false,
  error: null,
  setDocuments: (documents) => set({ documents }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
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
});