import Hero from "../components/home/Hero";
import ServicesSection from "../components/sections/ServicesSection";
import AboutUs from "../components/sections/AboutUs";
import Header from "../components/sections/Header";

export default function Home() {
  return (
    <main>
      <Header/>
      <Hero />
      <AboutUs />
      <ServicesSection />
    </main>
  );
}
