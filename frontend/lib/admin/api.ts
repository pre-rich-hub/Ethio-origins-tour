export type AdminApiEnvelope<T> = {
  success: boolean
  message: string
  data: T
  errors?: Array<{ path?: string; message: string }>
}

export async function adminRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  let response: Response

  try {
    response = await fetch(path, {
      ...init,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        ...init.headers,
      },
    })
  } catch {
    throw new Error('The backend API is not reachable. Make sure the backend server is running and the API URL is configured correctly.')
  }

  const payload = (await response.json().catch(() => null)) as AdminApiEnvelope<T> | null

  if (!response.ok || !payload?.success) {
    const detail = payload?.errors?.map((error) => error.message).join(', ')
    const statusMessage = response.status === 413
      ? 'The selected images are too large. Use files no larger than 5 MB each.'
      : response.status === 401
        ? 'Your admin session has expired. Sign in and try again.'
        : response.status >= 500
          ? 'The backend server could not complete the request. Check the backend logs and media storage configuration.'
          : 'The request could not be completed.'
    throw new Error(detail || payload?.message || statusMessage)
  }

  return payload.data
}

export function formatAdminDate(value: string | null | undefined): string {
  if (!value) return '—'
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value))
}
