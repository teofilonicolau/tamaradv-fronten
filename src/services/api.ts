// arquivo: src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tamarai-backend-production.up.railway.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
  },
});

export default api;