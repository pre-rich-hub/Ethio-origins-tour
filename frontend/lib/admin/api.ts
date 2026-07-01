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
  const response = await fetch(path, {
    ...init,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...init.headers,
    },
  })

  const payload = (await response.json().catch(() => null)) as AdminApiEnvelope<T> | null

  if (!response.ok || !payload?.success) {
    const detail = payload?.errors?.map((error) => error.message).join(', ')
    throw new Error(detail || payload?.message || 'The request could not be completed.')
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
