const withBundleAnalyzer =
  process.env.ANALYZE === "true"
    ? (await import("@next/bundle-analyzer")).default({ enabled: true })
    : (config) => config;

const isProductionDeployment =
  process.env.VERCEL_ENV === "production" ||
  process.env.NEXT_PUBLIC_DEPLOYMENT_ENV === "production" ||
  process.env.DEPLOYMENT_ENV === "production";

function normalizeUrl(value) {
  return value.replace(/\/+$/, "");
}

function parseUrl(value, label) {
  try {
    const url = new URL(value);

    if (!["http:", "https:"].includes(url.protocol)) {
      throw new Error(`${label} must use http or https.`);
    }

    return url;
  } catch (error) {
    throw new Error(
      `${label} must be a valid absolute URL.${error instanceof Error ? ` ${error.message}` : ""}`,
    );
  }
}

function isLocalhost(url) {
  return ["localhost", "127.0.0.1", "0.0.0.0", "::1"].includes(url.hostname);
}

function isPreviewLikeUrl(url) {
  const hostname = url.hostname.toLowerCase();

  return (
    hostname.endsWith(".vercel.app") ||
    hostname.includes("staging") ||
    hostname.includes("preview")
  );
}

function getValidatedSiteUrl() {
  const rawSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://ethiooriginstour.com";
  const siteUrl = parseUrl(normalizeUrl(rawSiteUrl), "NEXT_PUBLIC_SITE_URL");

  if (isProductionDeployment) {
    if (!process.env.NEXT_PUBLIC_SITE_URL) {
      throw new Error(
        "NEXT_PUBLIC_SITE_URL is required for production deployments.",
      );
    }

    if (isLocalhost(siteUrl)) {
      throw new Error(
        "NEXT_PUBLIC_SITE_URL cannot be localhost in production.",
      );
    }

    if (isPreviewLikeUrl(siteUrl)) {
      throw new Error(
        "NEXT_PUBLIC_SITE_URL cannot be a preview or staging URL in production.",
      );
    }
  }

  return normalizeUrl(siteUrl.toString());
}

function getValidatedApiBaseUrl() {
  const rawApiBaseUrl =
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:5000";
  const apiBaseUrl = parseUrl(normalizeUrl(rawApiBaseUrl), "API base URL");

  if (isProductionDeployment) {
    if (!process.env.API_BASE_URL && !process.env.NEXT_PUBLIC_API_BASE_URL) {
      throw new Error(
        "API_BASE_URL or NEXT_PUBLIC_API_BASE_URL is required in production.",
      );
    }

    if (isLocalhost(apiBaseUrl)) {
      throw new Error("API base URL cannot be localhost in production.");
    }
  }

  return normalizeUrl(apiBaseUrl.toString());
}

getValidatedSiteUrl()

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/divimnzxa/image/upload/**",
      },
    ],
  },
  async rewrites() {
    const apiBaseUrl = getValidatedApiBaseUrl();

    return [
      {
        source: "/api/:path*",
        destination: `${apiBaseUrl}/api/:path*`,
      },
      {
        source: "/assets/:path*",
        destination: `${apiBaseUrl}/assets/:path*`,
      },
    ];
  },
  async headers() {
    const securityHeaders = [
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
      {
        key: "X-Frame-Options",
        value: "DENY",
      },
    ];

    if (isProductionDeployment) {
      securityHeaders.push({
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains; preload",
      });
    }

    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/destination.php",
        destination: "/destinations",
        permanent: true,
      },
      {
        source: "/tour.php",
        destination: "/tours",
        permanent: true,
      },
      {
        source: "/contact.php",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/tours/13-days-southern-ethiopia-cultural-nature-adventure",
        destination:
          "/tours/10-day-omo-valley-bale-mountains-cultural-adventure",
        permanent: true,
      },
      {
        source: "/tours/8-days-historic-northern-route",
        destination: "/tours/5-day-ethiopia-historic-route-tour",
        permanent: true,
      },
      {
        source: "/tours/5-days-danakil-depression-expedition",
        destination: "/tours/4-day-danakil-depression-erta-ale-tour",
        permanent: true,
      },
      {
        source: "/tours/3-days-addis-ababa-cultural-city-break",
        destination: "/tours/addis-ababa-full-day-city-tour",
        permanent: true,
      },
      {
        source: "/tours/10-days-omo-valley-photography-expedition",
        destination: "/tours/8-day-omo-valley-cultural-discovery-tour",
        permanent: true,
      },
      {
        source: "/tours/12-days-ethiopia-grand-circuit",
        destination: "/tours/20-day-ethiopia-historical-cultural-adventure",
        permanent: true,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
