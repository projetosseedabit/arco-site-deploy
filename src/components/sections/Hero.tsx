import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-hero-pattern bg-cover bg-center"
    >
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm border border-primary/20">
                Empresa Júnior da UFPE
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-custom-gray">
              Prazer, somos a <br />
              <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                Arco Consultoria
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-custom-light-gray max-w-2xl">
              Transformamos ideias em soluções inovadoras. Nossa equipe de estudantes da UFPE 
              oferece consultoria de excelência em Design, Engenharia e Arquitetura, 
              unindo conhecimento acadêmico e prática de mercado.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="rounded-full">
                Conheça nossos serviços
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full border-custom-teal text-custom-teal hover:bg-custom-teal hover:text-white">
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
