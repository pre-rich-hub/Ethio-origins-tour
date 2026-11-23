// Shared URL handling for next.config.mjs (build time) and lib/env.ts (runtime).
// Keep both callers on this module so a value that builds also runs.

const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1"]);
const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:\/\//i;

/**
 * @param {string} value
 * @returns {string}
 */
export function normalizeUrl(value) {
  return value.replace(/\/+$/, "");
}

/**
 * @param {URL} url
 * @returns {boolean}
 */
export function isLocalhostUrl(url) {
  return LOCAL_HOSTNAMES.has(url.hostname);
}

/**
 * @param {URL} url
 * @returns {boolean}
 */
export function isPreviewLikeUrl(url) {
  const hostname = url.hostname.toLowerCase();

  return (
    hostname.endsWith(".vercel.app") ||
    hostname.includes("staging") ||
    hostname.includes("preview")
  );
}

/**
 * @param {URL | string} siteUrl
 * @returns {string}
 */
export function deriveApiOrigin(siteUrl) {
  const url = siteUrl instanceof URL ? siteUrl : new URL(siteUrl);
  const host = url.hostname.replace(/^www\./i, "");
  const apiHost = host.startsWith("api.") ? host : `api.${host}`;

  return `${url.protocol}//${apiHost}`;
}

/**
 * Turns a configured value into a URL. Strips one layer of wrapping quotes or
 * backticks, rejects obvious copy-paste garbage, and assumes https for a bare
 * hostname in production. Every failure names the received value.
 *
 * @param {string} value
 * @param {string} label
 * @param {{ production?: boolean }} [options]
 * @returns {URL}
 */
export function normalizeAbsoluteUrl(value, label, options = {}) {
  const production = options.production === true;
  let raw = String(value ?? "").trim();

  const wrapped = raw.match(/^(["'`])([\s\S]*)\1$/);
  if (wrapped) {
    raw = wrapped[2].trim();
  }

  if (!raw) {
    throw new Error(`${label} is empty.`);
  }

  if (/["'`<>]/.test(raw)) {
    throw new Error(
      `${label} contains quote or placeholder characters: ${JSON.stringify(raw)}.`,
    );
  }

  if (/\s/.test(raw)) {
    throw new Error(
      `${label} contains whitespace: ${JSON.stringify(raw)}.`,
    );
  }

  if (raw.includes("=")) {
    throw new Error(
      `${label} looks like a KEY=value line: ${JSON.stringify(raw)}.`,
    );
  }

  const candidate =
    HAS_SCHEME.test(raw) || !production ? raw : `https://${raw}`;

  let url;
  try {
    url = new URL(candidate);
  } catch {
    throw new Error(
      `${label} must be a valid absolute URL (received ${JSON.stringify(raw)}).`,
    );
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error(
      `${label} must use http or https (received ${JSON.stringify(raw)}).`,
    );
  }

  if (production) {
    if (isLocalhostUrl(url)) {
      throw new Error(
        `${label} cannot be localhost in production (received ${JSON.stringify(raw)}).`,
      );
    }

    if (!url.hostname.includes(".")) {
      throw new Error(
        `${label} must include a domain name in production (received ${JSON.stringify(raw)}).`,
      );
    }
  }

  return url;
}

/**
 * Resolves the API origin without blocking a production build on it.
 *
 * Priority:
 * 1. API_BASE_URL or NEXT_PUBLIC_API_BASE_URL when valid.
 * 2. A value derived from the site URL in production (api.<site-host>).
 * 3. http://localhost:5000 outside production.
 *
 * An invalid explicit value is ignored in production with a warning, so a
 * stale or malformed env var cannot fail a deploy. Outside production it
 * throws, because a bad local value should be visible immediately.
 *
 * @param {string | undefined} explicit
 * @param {URL} siteUrl
 * @param {{ production: boolean, warn?: (message: string) => void }} options
 * @returns {URL}
 */
export function resolveApiBaseUrl(explicit, siteUrl, options) {
  const production = options.production === true;
  const warn = options.warn;

  if (explicit) {
    try {
      return normalizeAbsoluteUrl(explicit, "API base URL", { production });
    } catch (error) {
      if (!production) throw error;
      const message = error instanceof Error ? error.message : String(error);
      warn?.(`Ignoring invalid API base URL. ${message}`);
    }
  }

  if (!production) {
    return normalizeAbsoluteUrl("http://localhost:5000", "API base URL");
  }

  const derived = deriveApiOrigin(siteUrl);
  warn?.(
    `API base URL is not configured. Falling back to ${derived}. Set API_BASE_URL or NEXT_PUBLIC_API_BASE_URL in Vercel to point at the real backend.`,
  );

  return normalizeAbsoluteUrl(derived, "API base URL", { production: true });
}
