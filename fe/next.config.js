/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'catlinky-dev.s3.ap-southeast-1.amazonaws.com',
      },
    ],
  },
};

module.exports = nextConfig;
