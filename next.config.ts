import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use serverExternalPackages to handle libraries with dynamic imports/workers
  serverExternalPackages: ['canvas', 'fflate'],
  
  // To silence the Turbopack warning about webpack config and provide compatibility
  turbopack: {},
};

export default nextConfig;
