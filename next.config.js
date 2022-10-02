/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "https://localhost:8000",
      "https://sweettooth-app.herokuapp.com/",
      "https://res.cloudinary.com/",
      "res.cloudinary.com",
    ],
  },
  // reactStrictMode: true,
  // swcMinify: true,
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "res.cloudinary.com",
  //     },
  //   ],
  // },
};

module.exports = nextConfig;
