import { getPublicEnv } from '@/lib/env'

export type ApiErrorCode =
  | 'network_error'
  | 'timeout'
  | 'validation_error'
  | 'unauthorized'
  | 'forbidden'
  | 'not_found'
  | 'server_error'
  | 'unknown'

export type ApiEnvelope<T> = {
  success: boolean
  message: string
  data: T
  errors?: { path?: string; message: string }[]
}

export class ApiError extends Error {
  code: ApiErrorCode
  status?: number

  constructor(code: ApiErrorCode, message = 'API request failed.', status?: number) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.status = status
  }
}

const DEFAULT_TIMEOUT_MS = 10000

export function getApiBaseUrl() {
  return getPublicEnv().apiBaseUrl
}

export function getPublicApiBaseUrl() {
  return getPublicEnv().apiBaseUrl
}

type ApiFetchInit<T> = RequestInit & {
  fallback?: T
  timeoutMs?: number
  next?: {
    revalidate?: number | false
    tags?: string[]
  }
}

function getErrorCode(status: number): ApiErrorCode {
  if (status === 400 || status === 422) return 'validation_error'
  if (status === 401) return 'unauthorized'
  if (status === 403) return 'forbidden'
  if (status === 404) return 'not_found'
  if (status >= 500) return 'server_error'
  return 'unknown'
}

async function readJson<T>(response: Response): Promise<ApiEnvelope<T> | null> {
  if (response.status === 204) return null

  const contentType = response.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) return null

  try {
    return (await response.json()) as ApiEnvelope<T>
  } catch {
    return null
  }
}

export async function apiFetch<T>(
  path: string,
  init?: ApiFetchInit<T>,
): Promise<T> {
  const url = `${getApiBaseUrl()}${path.startsWith('/') ? path : `/${path}`}`
  const controller = new AbortController()
  const timeout = globalThis.setTimeout(
    () => controller.abort(),
    init?.timeoutMs ?? DEFAULT_TIMEOUT_MS,
  )

  if (init?.signal) {
    if (init.signal.aborted) {
      controller.abort()
    } else {
      init.signal.addEventListener('abort', () => controller.abort(), {
        once: true,
      })
    }
  }

  try {
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...init?.headers,
      },
      next: { revalidate: 60 },
    })

    const payload = await readJson<T>(response)

    if (!response.ok) {
      throw new ApiError(
        getErrorCode(response.status),
        'API request failed.',
        response.status,
      )
    }

    if (response.status === 204) {
      return undefined as T
    }

    if (!payload?.success) {
      throw new ApiError('unknown', 'API request failed.', response.status)
    }

    return payload.data
  } catch (error) {
    if ('fallback' in (init ?? {})) {
      return init?.fallback as T
    }

    if (error instanceof ApiError) {
      throw error
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError('timeout', 'API request timed out.')
    }

    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError('timeout', 'API request timed out.')
    }

    throw new ApiError('network_error', 'Network request failed.')
  } finally {
    globalThis.clearTimeout(timeout)
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError
}
