/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    }
    config.output.webassemblyModuleFilename = 'static/wasm/[modulehash].wasm'
    return config
  },
}

module.exports = nextConfig
