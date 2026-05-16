import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { authService } from '../services/authService';

export const useAuth = () => {
  const navigate = useNavigate();
  const { user, token, isLoading, error, setUser, setToken, setLoading, setError, logout } =
    useAuthStore();

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true);
        setError(null);
        const response = await authService.login({ email, password });

        if (response.success && response.data) {
          setToken(response.data.token);
          setUser(response.data.user);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          navigate('/dashboard');
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Login failed';
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, setToken, setUser, navigate]
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      try {
        setLoading(true);
        setError(null);
        const response = await authService.register({ name, email, password });

        if (response.success && response.data) {
          setToken(response.data.token);
          setUser(response.data.user);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          navigate('/dashboard');
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Registration failed';
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, setToken, setUser, navigate]
  );

  const handleLogout = useCallback(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  return {
    user,
    token,
    isLoading,
    error,
    login,
    register,
    logout: handleLogout,
    isAuthenticated: !!token,
  };
};
