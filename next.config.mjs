/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  eslint: {
    // Legacy TanStack tree under src/ is excluded from the product;
    // keep it out of the production build gate until fully removed.
    dirs: ['app', 'components', 'lib'],
  },
  typescript: {
    // tsconfig already scopes include to app/components/lib
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
