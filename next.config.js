/** @type {import('next').Config} */
const nextConfig = {
  // App Router is stable in Next.js 15, no experimental flag needed
  
  // Exclude js-yaml from serverless bundle (load at runtime)
  serverExternalPackages: ['js-yaml'],
  
  // Include data directory in the build for production
  outputFileTracingIncludes: {
    '/': ['./data/**/*'],
    '/books': ['./data/**/*'],
    '/book/*': ['./data/**/*'],
    '/my-loans': ['./data/**/*'],
  },
  
}

export default nextConfig
