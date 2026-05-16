import { create } from 'zustand';
import { Lead, LeadStatus, LeadSource, FilterOptions } from '../types';

interface LeadStore {
  leads: Lead[];
  isLoading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  totalResults: number;
  filters: FilterOptions;
  
  setLeads: (leads: Lead[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPagination: (page: number, totalPages: number, totalResults: number) => void;
  setFilters: (filters: FilterOptions) => void;
  addLead: (lead: Lead) => void;
  updateLead: (lead: Lead) => void;
  removeLead: (id: string) => void;
  reset: () => void;
}

export const useLeadStore = create<LeadStore>((set) => ({
  leads: [],
  isLoading: false,
  error: null,
  page: 1,
  totalPages: 0,
  totalResults: 0,
  filters: { limit: 10, page: 1 },

  setLeads: (leads) => set({ leads }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setPagination: (page, totalPages, totalResults) =>
    set({ page, totalPages, totalResults }),
  setFilters: (filters) => set({ filters, page: 1 }),
  addLead: (lead) =>
    set((state) => ({
      leads: [lead, ...state.leads],
      totalResults: state.totalResults + 1,
    })),
  updateLead: (lead) =>
    set((state) => ({
      leads: state.leads.map((l) => (l._id === lead._id ? lead : l)),
    })),
  removeLead: (id) =>
    set((state) => ({
      leads: state.leads.filter((l) => l._id !== id),
      totalResults: state.totalResults - 1,
    })),
  reset: () =>
    set({
      leads: [],
      isLoading: false,
      error: null,
      page: 1,
      totalPages: 0,
      totalResults: 0,
      filters: { limit: 10, page: 1 },
    }),
}));
