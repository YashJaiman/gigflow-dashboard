export type UserRole = 'admin' | 'sales';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
}

export enum LeadStatus {
  NEW = 'New',
  CONTACTED = 'Contacted',
  QUALIFIED = 'Qualified',
  LOST = 'Lost',
}

export enum LeadSource {
  WEBSITE = 'Website',
  INSTAGRAM = 'Instagram',
  REFERRAL = 'Referral',
}

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    user: User;
  };
}

export interface LeadsResponse {
  success: boolean;
  page: number;
  totalPages: number;
  totalResults: number;
  data: Lead[];
}

export interface LeadResponse {
  success: boolean;
  message: string;
  data?: Lead;
}

export interface ApiError {
  success: false;
  message: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface CreateLeadPayload {
  name: string;
  email: string;
  source: LeadSource;
  status?: LeadStatus;
}

export interface UpdateLeadPayload {
  name?: string;
  email?: string;
  status?: LeadStatus;
  source?: LeadSource;
}

export interface FilterOptions {
  status?: LeadStatus;
  source?: LeadSource;
  search?: string;
  sortBy?: 'createdAt' | '-createdAt';
  page?: number;
  limit?: number;
}
