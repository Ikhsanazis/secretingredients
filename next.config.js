/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sweettooth-app.herokuapp.com",
      },
    ],
  },
};

module.exports = nextConfig;
