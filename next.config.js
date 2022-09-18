/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "localhost",
      "localhost:8000",
      "https://sweettooth-app.herokuapp.com/images",
      "http://localhost:8000",
      "sweettooth-app.herokuapp.com/images",
      "sweettooth-app.herokuapp.com",
    ],
  },
};

module.exports = nextConfig;
