import TimeLine from "@/components/sections/timeline";
import Hero from "@/components/sections/home";
import ServicesSection from "@/components/sections/ServicesSection";
import Header from "@/components/layout/Header";
import CasesSection from "@/components/sections/CasesSection";
import AboutUs from "@/components/sections/AboutUs";
import { InstaCarousel } from "@/components/sections/InstaPosts";
import FeedbackSection from "@/components/sections/FeedbackSection";

interface InstagramPost {
  id: string;
  media_url: string;
  caption?: string;
  permalink: string;
}

async function getInstagramPosts(): Promise<InstagramPost[]> {
  try {
    // Ajuste para garantir que não quebre no build se a variável não existir
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    
    // verificação p/ evitar erro de fetch durante build estático se necessário
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
      <TimeLine />
      <ServicesSection />
      <InstaCarousel posts={posts} />
      <CasesSection />

      <FeedbackSection />
    </main>
  );
}