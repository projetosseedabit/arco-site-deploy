import Hero from "@/components/sections/Hero";
import AboutUs from "@/components/sections/AboutUs";
import ServicesSection from "@/components/sections/ServicesSection";
import CasesSection from "@/components/sections/CasesSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutUs />
      <ServicesSection />
      <CasesSection />
    </main>
  );
}
