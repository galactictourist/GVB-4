/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/random',
      },
    ],
  },
  compiler: {
    styledComponents: true
  },
  env: {
    PROD_BACKEND: 'http://146.190.92.219:4000/',
    DEV_BACKEND: 'http://localhost:4000',
  },
};

module.exports = nextConfig;
