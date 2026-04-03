import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // 1. Enable static export
  output: 'export',

  // 2. Optional: Change links /me -> /me/ and emit /me.html -> /me/index.html
  // Recommended for GitHub Pages to avoid 404s on refresh
  trailingSlash: true,

  // 3. Set the base path (only if your site is NOT on a custom domain)
  // Replace 'your-repo-name' with your actual GitHub repository name
  basePath: isProd ? '/your-repo-name' : '',

  // 4. Disable server-side image optimization (not supported in static exports)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
