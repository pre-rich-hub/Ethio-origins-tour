export type ApiEnvelope<T> = {
  success: boolean
  message: string
  data: T
  errors?: { path?: string; message: string }[]
}

const DEFAULT_API_BASE_URL = 'http://localhost:5000'

export function getApiBaseUrl() {
  return (
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    DEFAULT_API_BASE_URL
  ).replace(/\/$/, '')
}

export function getPublicApiBaseUrl() {
  return (process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL).replace(
    /\/$/,
    '',
  )
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit & { fallback?: T },
): Promise<T> {
  const url = `${getApiBaseUrl()}${path.startsWith('/') ? path : `/${path}`}`

  try {
    const response = await fetch(url, {
      ...init,
      headers: {
        Accept: 'application/json',
        ...init?.headers,
      },
      next: { revalidate: 60 },
    })

    const payload = (await response.json()) as ApiEnvelope<T>

    if (!response.ok || !payload.success) {
      throw new Error(payload.message || `API request failed: ${response.status}`)
    }

    return payload.data
  } catch (error) {
    if ('fallback' in (init ?? {})) {
      return init?.fallback as T
    }

    throw error
  }
}
