/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
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
        destination: '/tours/13-day-southern-ethiopia-cultural-tour',
        permanent: true,
      },
      {
        source: '/tours/8-days-historic-northern-route',
        destination: '/tours/8-day-historic-northern-route-tour',
        permanent: true,
      },
      {
        source: '/tours/6-days-simien-mountains-trekking',
        destination: '/tours/6-day-simien-mountains-trekking-tour',
        permanent: true,
      },
      {
        source: '/tours/5-days-danakil-depression-expedition',
        destination: '/tours/5-day-danakil-depression-tour',
        permanent: true,
      },
      {
        source: '/tours/7-days-bale-mountains-wildlife-safari',
        destination: '/tours/7-day-bale-mountains-wildlife-safari',
        permanent: true,
      },
      {
        source: '/tours/4-days-rift-valley-lakes-retreat',
        destination: '/tours/4-day-rift-valley-lakes-retreat',
        permanent: true,
      },
      {
        source: '/tours/3-days-addis-ababa-cultural-city-break',
        destination: '/tours/3-day-addis-ababa-city-tour',
        permanent: true,
      },
      {
        source: '/tours/9-days-coffee-heritage-and-highlands',
        destination: '/tours/9-day-ethiopian-coffee-origin-tour',
        permanent: true,
      },
      {
        source: '/tours/10-days-omo-valley-photography-expedition',
        destination: '/tours/10-day-omo-valley-photography-tour',
        permanent: true,
      },
      {
        source: '/tours/5-days-awash-wildlife-and-hot-springs',
        destination: '/tours/5-day-awash-wildlife-hot-springs-tour',
        permanent: true,
      },
      {
        source: '/tours/12-days-ethiopia-grand-circuit',
        destination: '/tours/12-day-ethiopia-grand-circuit-tour',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
