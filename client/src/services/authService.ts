import apiClient from './api';
import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  User,
} from '../types';

export const authService = {
  register: (data: RegisterPayload): Promise<AuthResponse> =>
    apiClient.post('/auth/register', data).then((res) => res.data),

  login: (data: LoginPayload): Promise<AuthResponse> =>
    apiClient.post('/auth/login', data).then((res) => res.data),

  me: (): Promise<{ success: boolean; data: User }> =>
    apiClient.get('/auth/me').then((res) => res.data),
};
