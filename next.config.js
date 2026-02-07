/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true,
    },
    // Update this with your GitHub repository name
    // If your repo is https://github.com/username/kirana-digital
    // basePath: '/kirana-digital',
    // assetPrefix: '/kirana-digital/',
    
    // Remove the basePath and assetPrefix above if deploying to username.github.io
  }
  
  module.exports = nextConfig