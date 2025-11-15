import Hero from "../components/home/Hero";
import ServicesSection from "../components/sections/ServicesSection";
import AboutUs from "../components/sections/AboutUs";
import Header from "../components/sections/Header";
import { InstaCarousel } from "../components/sections/InstaPosts";

interface InstagramPost {
  id: string;
  media_url: string;
  caption?: string;
  permalink: string;
}

async function getInstagramPosts(): Promise<InstagramPost[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/instagram`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error("Failed to fetch Instagram posts");
      return [];
    }

    const posts = await res.json();
    return Array.isArray(posts) ? posts : [];
  } catch (error) {
    console.error("Error fetching Instagram posts:", error);
    return [];
  }
}

export default async function Home() {
  const posts = await getInstagramPosts();

  return (
    <main>
      <Header />
      <Hero />
      <AboutUs />
      <ServicesSection />
      <InstaCarousel posts={posts} />
    </main>
  );
}
