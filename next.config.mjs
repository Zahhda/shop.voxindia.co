/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,

  images: {
    unoptimized: true,
  },

  assetPrefix: '/', // ✅ Helps with static asset loading and fonts

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  env: {
    CASHFREE_CLIENT_ID: process.env.CASHFREE_CLIENT_ID,
    CASHFREE_CLIENT_SECRET: process.env.CASHFREE_CLIENT_SECRET,
  },
};

export default nextConfig;
