const withBundleAnalyzer =
  process.env.ANALYZE === 'true'
    ? (await import('@next/bundle-analyzer')).default({ enabled: true })
    : (config) => config

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/divimnzxa/image/upload/**',
      },
    ],
  },
  async rewrites() {
    const apiBaseUrl = (
      process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'
    ).replace(/\/$/, '')

    return [
      {
        source: '/api/:path*',
        destination: `${apiBaseUrl}/api/:path*`,
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/destination.php',
        destination: '/destinations',
        permanent: true,
      },
      {
        source: '/tour.php',
        destination: '/tours',
        permanent: true,
      },
      {
        source: '/contact.php',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/destinations/lalibela',
        destination: '/destinations/lalibela-and-the-north',
        permanent: true,
      },
      {
        source: '/destinations/omo-valley',
        destination: '/destinations/omo-valley-cultures',
        permanent: true,
      },
      {
        source: '/tours/13-days-southern-ethiopia-cultural-nature-adventure',
        destination: '/tours/10-day-omo-valley-bale-mountains-cultural-adventure',
        permanent: true,
      },
      {
        source: '/tours/8-days-historic-northern-route',
        destination: '/tours/5-day-ethiopia-historic-route-tour',
        permanent: true,
      },
      {
        source: '/tours/5-days-danakil-depression-expedition',
        destination: '/tours/4-day-danakil-depression-erta-ale-tour',
        permanent: true,
      },
      {
        source: '/tours/3-days-addis-ababa-cultural-city-break',
        destination: '/tours/addis-ababa-full-day-city-tour',
        permanent: true,
      },
      {
        source: '/tours/10-days-omo-valley-photography-expedition',
        destination: '/tours/8-day-omo-valley-cultural-discovery-tour',
        permanent: true,
      },
      {
        source: '/tours/12-days-ethiopia-grand-circuit',
        destination: '/tours/20-day-ethiopia-historical-cultural-adventure',
        permanent: true,
      },
    ]
  },
}

export default withBundleAnalyzer(nextConfig)
