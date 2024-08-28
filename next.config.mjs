/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "github.com",
      "avatars.githubusercontent.com",
      "images.unsplash.com",
      "plus.unsplash.com",
      "utfs.io",
      "fakeimg.pl",
    ], // Add other domains as needed
  },
  async headers() {
    return [
      {
        // Match all routes
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'no-store',
          },
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 'no-store',
          },
        ],
      },
    ];
  },
};

export default nextConfig;