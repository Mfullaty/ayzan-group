import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['terminal.local'],
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
