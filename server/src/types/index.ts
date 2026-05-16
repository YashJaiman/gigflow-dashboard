export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export type UserRole = 'admin' | 'sales';

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

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILead {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface IPaginatedResponse<T> {
  success: boolean;
  page: number;
  totalPages: number;
  totalResults: number;
  data: T[];
}

export interface IAuthResponse extends IApiResponse<{
  token: string;
  user: Omit<IUser, 'password'>;
}> {}

export interface IFilterOptions {
  status?: LeadStatus;
  source?: LeadSource;
  search?: string;
  sortBy?: 'createdAt' | '-createdAt';
  page?: number;
  limit?: number;
}
