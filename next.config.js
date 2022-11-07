/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    images: {
      allowFutureImages: true,
    }
  }
}

module.exports = nextConfig
