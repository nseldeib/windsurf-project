/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com'], // Add any image domains you need
  },
  experimental: {
    serverActions: true,
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in /api/
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
