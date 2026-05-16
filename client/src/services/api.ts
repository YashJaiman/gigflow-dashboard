import axios, { AxiosInstance } from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const baseURL = apiUrl || (import.meta.env.DEV ? 'http://localhost:5000/api' : undefined);

if (!baseURL) {
  throw new Error(
    'VITE_API_URL is not defined. Set VITE_API_URL in your production environment variables to your backend API URL.'
  );
}

const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API response error:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url,
      });
    } else if (error.request) {
      console.error('API request error: No response received', error.request);
    } else {
      console.error('API setup error:', error.message);
    }

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default apiClient;
