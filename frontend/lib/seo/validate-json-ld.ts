type JsonLdIssue = {
  path: string
  message: string
}

const PLACEHOLDER_PATTERN =
  /(placeholder|lorem ipsum|coming soon|pending client|internal review note)/i

function walk(value: unknown, path: string, issues: JsonLdIssue[]) {
  if (value === undefined) {
    issues.push({ path, message: 'Value is undefined.' })
    return
  }

  if (typeof value === 'string') {
    if (!value.trim()) {
      issues.push({ path, message: 'String is empty.' })
    }

    if (PLACEHOLDER_PATTERN.test(value)) {
      issues.push({ path, message: 'String contains placeholder or internal text.' })
    }
  }

  if (Array.isArray(value)) {
    value.forEach((entry, index) => walk(entry, `${path}[${index}]`, issues))
    return
  }

  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, entry]) =>
      walk(entry, `${path}.${key}`, issues),
    )
  }
}

function validateUrl(value: unknown, path: string, issues: JsonLdIssue[]) {
  if (typeof value !== 'string') {
    issues.push({ path, message: 'URL is not a string.' })
    return
  }

  try {
    const url = new URL(value)
    if (!['http:', 'https:'].includes(url.protocol)) {
      issues.push({ path, message: 'URL must use http or https.' })
    }
  } catch {
    issues.push({ path, message: 'URL is not absolute.' })
  }
}

export function validateJsonLd(data: unknown) {
  const issues: JsonLdIssue[] = []

  try {
    JSON.stringify(data)
  } catch {
    issues.push({ path: '$', message: 'JSON-LD is not serializable.' })
  }

  walk(data, '$', issues)

  if (data && typeof data === 'object') {
    const record = data as Record<string, unknown>
    for (const key of ['url', 'image', 'logo']) {
      if (key in record) validateUrl(record[key], `$.${key}`, issues)
    }

    if (record['@type'] === 'BreadcrumbList' && Array.isArray(record.itemListElement)) {
      const positions = new Set<number>()
      record.itemListElement.forEach((item, index) => {
        if (!item || typeof item !== 'object') {
          issues.push({
            path: `$.itemListElement[${index}]`,
            message: 'Breadcrumb item is not an object.',
          })
          return
        }

        const breadcrumb = item as Record<string, unknown>
        if (typeof breadcrumb.position !== 'number') {
          issues.push({
            path: `$.itemListElement[${index}].position`,
            message: 'Breadcrumb position is missing.',
          })
        } else if (positions.has(breadcrumb.position)) {
          issues.push({
            path: `$.itemListElement[${index}].position`,
            message: 'Breadcrumb position is duplicated.',
          })
        } else {
          positions.add(breadcrumb.position)
        }

        validateUrl(breadcrumb.item, `$.itemListElement[${index}].item`, issues)
      })
    }
  }

  return {
    valid: issues.length === 0,
    issues,
  }
}
