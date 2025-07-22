import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SITE_URL || '/api',
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

    const message = String(error.response ? error.response.data : error.message)

    toast.error(message)
  }
)
