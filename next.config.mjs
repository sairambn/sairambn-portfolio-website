/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 256, 384, 480, 640, 750],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  eslint: {
    dirs: ['app', 'components', 'lib'],
  },
  transpilePackages: ['@splinetool/react-spline', '@splinetool/runtime'],
};

export default nextConfig;
