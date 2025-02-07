/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["formidable"],
  },
  webpack: (config) => {
    config.externals = [...config.externals, "formidable"]
    return config
  },
}

module.exports = nextConfig

