/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/post/:slug*",
        destination: "/blog/:slug*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
