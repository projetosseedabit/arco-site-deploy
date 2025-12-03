import { MetadataRoute } from 'next'
import { getAllPosts } from '@/services/blogService'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // trocar pelo dominio depois
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.arcoconsultoria.com';

  const posts = await getAllPosts();

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(), 
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...postUrls,
  ]
}