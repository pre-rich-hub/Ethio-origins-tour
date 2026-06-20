/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
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
    ]
  },
}

export default nextConfig
