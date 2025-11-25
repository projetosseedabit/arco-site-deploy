import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Aumenta o limite de upload para 10MB
    },
  },
  // Permite carregar imagens de qualquer lugar (necessário se usar imagens externas no futuro)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;