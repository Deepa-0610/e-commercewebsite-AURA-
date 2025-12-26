import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  transpilePackages: ['@aura/ui', '@aura/lib'],
  // Ensure Next traces files from the repository root when multiple lockfiles exist
  outputFileTracingRoot: path.join(__dirname, '..', '..'),
}

export default nextConfig
