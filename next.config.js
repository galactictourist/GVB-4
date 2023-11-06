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
    PROD_BACKEND: 'https://nft-generator-akbg.onrender.com',
    DEV_BACKEND: 'http://localhost:4000',
  },
};

module.exports = nextConfig;
