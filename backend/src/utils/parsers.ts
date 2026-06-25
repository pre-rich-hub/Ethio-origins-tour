export function parseJsonArray(value: unknown): unknown[] {
  if (!value || typeof value !== "string") return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function parseOptionalJsonArrayString(value: unknown): string {
  if (typeof value !== "string" || value.trim() === "") return "[]";
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return JSON.stringify(parsed);
  } catch {
    const items = value
      .split(/[\r\n,]+/)
      .map((item) => item.trim())
      .filter(Boolean);
    return JSON.stringify(items);
  }
  return "[]";
}

export function toNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

export function toBoolean(value: unknown): boolean {
  return value === true || value === "true" || value === "1" || value === "on" || value === 1;
}

