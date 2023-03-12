/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {

  },
  publicRuntimeConfig: {
    // Add any configuration variables you need here
    STATIC_FOLDER: process.env.STATIC_FOLDER || "/",
  },
}

module.exports = nextConfig
