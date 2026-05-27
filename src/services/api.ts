import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para tratar erros globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Erro inesperado. Tente novamente.'
    console.error('[API Error]', message)
    return Promise.reject(error)
  }
)

export default api
