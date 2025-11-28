// src/config/api.ts
import axios from 'axios';

// URL vem do .env (VITE_API_URL) ou fallback para produção
const baseURL =
  import.meta.env.VITE_API_URL ||
  'https://tamarai-backend-production.up.railway.app/api/v1';

const api = axios.create({
  baseURL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor global de erros (DX incrível)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Erro de conexão com o servidor';
    console.error('API Error →', {
      url: error.config?.url,
      status: error.response?.status,
      message,
    });
    // Opcional: aqui você pode disparar toast, Sentry, etc.
    return Promise.reject(error);
  }
);

export default api;