import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'src/app/styles')],
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
