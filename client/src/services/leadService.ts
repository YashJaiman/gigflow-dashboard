import apiClient from './api';
import {
  LeadsResponse,
  LeadResponse,
  CreateLeadPayload,
  UpdateLeadPayload,
  FilterOptions,
} from '../types';

export const leadService = {
  getLeads: (filters?: FilterOptions): Promise<LeadsResponse> => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.source) params.append('source', filters.source);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    return apiClient
      .get(`/leads?${params.toString()}`)
      .then((res) => res.data);
  },

  getLead: (id: string): Promise<LeadResponse> =>
    apiClient.get(`/leads/${id}`).then((res) => res.data),

  createLead: (data: CreateLeadPayload): Promise<LeadResponse> =>
    apiClient.post('/leads', data).then((res) => res.data),

  updateLead: (id: string, data: UpdateLeadPayload): Promise<LeadResponse> =>
    apiClient.put(`/leads/${id}`, data).then((res) => res.data),

  deleteLead: (id: string): Promise<{ success: boolean; message: string }> =>
    apiClient.delete(`/leads/${id}`).then((res) => res.data),
};
