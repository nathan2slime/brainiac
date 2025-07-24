import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'

export const api = axios.create({
  baseURL: typeof window === 'undefined' ? process.env.NEXT_PUBLIC_INTERNAL_API_URL : process.env.NEXT_PUBLIC_API_URL || '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

api.interceptors.request.use(async req => {
  const headers = await import('next/headers')

  if (typeof window === 'undefined') {
    const cookie = await headers.cookies()

    req.headers.Cookie = cookie.toString()
    req.withCredentials = true
  }

  return req
})

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (typeof window === 'undefined') return Promise.reject(error)

    if (error.response) {
      const status = error.response.status

      if (status === 404) {
        toast.error('Resource not found')
      } else {
        const message = String(error.response.data)
        toast.error(message)
      }
    } else {
      toast.error(error.message)
    }

    return Promise.reject(error)
  }
)
