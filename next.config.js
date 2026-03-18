/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/login', destination: 'https://cinis.app/login', permanent: true },
      { source: '/signup', destination: 'https://cinis.app/signup', permanent: true },
    ]
  },
}

module.exports = nextConfig
