/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/business',
        destination: '/se-lancer',
        permanent: true,
      },
      {
        source: '/categories',
        destination: '/formations',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/formations',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
