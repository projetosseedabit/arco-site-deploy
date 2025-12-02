import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // Mudar para o domínio certo depois
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.arcoconsultoria.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}