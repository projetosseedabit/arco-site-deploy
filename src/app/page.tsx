import TimeLine from "@/components/timeline/TimeLine";
import Hero from "../components/home/Hero";
import ServicesSection from "../components/sections/ServicesSection";
import Header from "@/components/sections/Header"

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <TimeLine />
      <ServicesSection/>
    </main>
  );
}
