/** @type {import('next').NextConfig} */
const { parsed: localEnv } = require('dotenv').config()
const nextConfig = {
  reactStrictMode: true,
  env: {
    ...localEnv
  }
}

module.exports = nextConfig
