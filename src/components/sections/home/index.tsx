"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Importante

const Hero = () => {
  const router = useRouter();

  const smoothScrollTo = (targetId: string) => {
    const target = document.getElementById(targetId);
    if (target) {
      const headerOffset = 85;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1500;
      let startTime: number | null = null;

      const ease = (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };

      requestAnimationFrame(animation);
    } else {
      router.push(`/#${targetId}`);
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[90vh] flex justify-center items-start overflow-hidden bg-hero-pattern bg-cover bg-center pt-20 px-8 md:px-20"
    >
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-60% to-white z-0 pointer-events-none"></div>

      {/* 1. ESQUERDA */}
      <Image
          src="/ArcoSVG1.svg"
          alt="Decorativo"
          width={300}
          height={300}
          className="hidden md:block absolute top-1/4 left-0 z-0 w-64 h-64 opacity-30 animate-float-left pointer-events-none"
      />

      {/* 2. DIREITA */}
      <Image
          src="/ArcoSVG1.svg"
          alt="Decorativo"
          width={300}
          height={300}
          className="hidden md:block absolute top-1/2 right-0 z-0 w-48 h-48 opacity-30 animate-float-right pointer-events-none rotate-180"
      />

      <div className="w-full max-w-screen-xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 space mt-20">
            <div className="inline-block">
            </div>

            <h1 className="text-hero-title font-bold leading-tight text-custom-gray">
              <span className="whitespace-nowrap">Prazer, somos a</span> <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent whitespace-nowrap">
                Arco Consultoria
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-custom-light-gray max-w-2xl">
              Transformamos ideias em soluções inovadoras. Nossa equipe de estudantes da UFPE 
              oferece consultoria de excelência em Design, Engenharia e Arquitetura, 
              unindo conhecimento acadêmico e prática de mercado.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="lg" 
                className="rounded-full z-20"
                onClick={() => smoothScrollTo("servicos")}
              >
                Conheça nossos serviços
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full border-custom-teal text-custom-teal hover:bg-custom-teal hover:text-white z-20"
                onClick={() => smoothScrollTo("sobre-nos")}
              >
                Saiba mais sobre nós
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;