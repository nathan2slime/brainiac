import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  // transpilePackages: ['@iac/ui'],
  webpack: config => {
    config.resolve.fallback = { fs: false }

    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack']
    })

    return config
  }
}

export default nextConfig
