import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'

export const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (typeof window === 'undefined') return Promise.reject(error)

    const message = String(error.response ? error.response.data : error.message)

    toast.error(message)
  }
)
