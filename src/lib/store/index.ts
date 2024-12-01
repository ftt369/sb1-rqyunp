import { create } from 'zustand';
import { AuthSlice, createAuthSlice } from './slices/authSlice';
import { CasesSlice, createCasesSlice } from './slices/casesSlice';
import { ClientsSlice, createClientsSlice } from './slices/clientsSlice';
import { DocumentsSlice, createDocumentsSlice } from './slices/documentsSlice';

export type StoreState = AuthSlice & CasesSlice & ClientsSlice & DocumentsSlice;

export const useStore = create<StoreState>()((...args) => ({
  ...createAuthSlice(...args),
  ...createCasesSlice(...args),
  ...createClientsSlice(...args),
  ...createDocumentsSlice(...args),
}));