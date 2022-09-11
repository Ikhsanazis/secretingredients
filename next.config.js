/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [ "localhost","localhost:8000","http://localhost:8000/images"],
  },
}

module.exports = nextConfig