import React from "react";
import { PenTool, HardHat, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const services = [
  {
    id: 1,
    title: "Design",
    description: "Soluções criativas e inovadoras em design gráfico, identidade visual, UX/UI e branding para empresas e projetos.",
    items: ["Editoração", "Direção de Arte", "Identidade Visual"],
    icon: PenTool,
    iconColor: "bg-pink-400",
  },
  {
    id: 2,
    title: "Arquitetura",
    description: "Projetos completos que unem estética e funcionalidade, transformando espaços em experiências únicas.",
    items: ["Consultoria de Interiores", "Design de Interiores", "Projeto Arquitetônico", "Concepção Externa"],
    icon: Ruler,
    iconColor: "bg-orange-400",
  },
  {
    id: 3,
    title: "Engenharia",
    description: "Excelência técnica e segurança para sua obra, com projetos estruturais e complementares de alta precisão.",
    items: ["Projeto Elétrico", "Projeto Estrutural", "Projeto Hidrossanitário"],
    icon: HardHat,
    iconColor: "bg-blue-400",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-24 bg-[#81D8D0] relative overflow-hidden">
      
      {/* Decoração de Fundo (Ondas Laterais) */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block pointer-events-none">
         <div className="w-[400px] h-[400px] rounded-full border-[3px] border-[#9CE3DC] absolute -left-[250px] top-1/2 -translate-y-1/2 opacity-60"></div>
         <div className="w-[500px] h-[500px] rounded-full border-[3px] border-[#9CE3DC] absolute -left-[300px] top-1/2 -translate-y-1/2 opacity-60"></div>
         <div className="w-[600px] h-[600px] rounded-full border-[3px] border-[#9CE3DC] absolute -left-[350px] top-1/2 -translate-y-1/2 opacity-60"></div>
      </div>
      
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block pointer-events-none">
         <div className="w-[400px] h-[400px] rounded-full border-[3px] border-[#9CE3DC] absolute -right-[250px] top-1/2 -translate-y-1/2 opacity-60"></div>
         <div className="w-[500px] h-[500px] rounded-full border-[3px] border-[#9CE3DC] absolute -right-[300px] top-1/2 -translate-y-1/2 opacity-60"></div>
         <div className="w-[600px] h-[600px] rounded-full border-[3px] border-[#9CE3DC] absolute -right-[350px] top-1/2 -translate-y-1/2 opacity-60"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Centralizado */}
        <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-block">
                <span className="px-4 py-2 rounded-full bg-white text-primary font-semibold text-sm border border-primary/20">
                    NOSSOS SERVIÇOS
                </span>
            </div>
            <h2 className="mt-6 text-4xl sm:text-5xl font-bold text-white">
                Serviços que Impactam
            </h2>
            <p className="mt-4 text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
                Soluções integradas para tirar seu projeto do papel com a qualidade técnica da UFPE.
            </p>
        </div>

        {/* Grid de 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-[2rem] p-8 shadow-xl flex flex-col items-center text-center relative group hover:-translate-y-2 transition-transform duration-300"
            >
              {/* Ícone Colorido */}
              <div className={`${service.iconColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md text-white`}>
                <service.icon size={32} />
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {service.title}
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              <ul className="text-left w-full space-y-2 mb-8 pl-4">
                {service.items.map((item, idx) => (
                  <li key={idx} className="flex items-center text-xs font-semibold text-gray-700">
                    <span className={`w-1.5 h-1.5 rounded-full mr-2 ${service.title === 'Design' ? 'bg-pink-400' : service.title === 'Arquitetura' ? 'bg-orange-400' : 'bg-blue-400'}`}></span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-auto w-full">
                <Button 
                  variant="outline" 
                  className="w-full rounded-full border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-custom-teal font-semibold"
                >
                  Saiba Mais
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Final - Inserido corretamente aqui */}
        <div className="text-center mt-16">
            <p className="text-sm text-white/90 mb-6 font-medium">Não encontrou o que procura? Clique em contato conosco</p>
            <Link
              href="#contato"
              className="inline-block text-white bg-gradient-to-r from-primary via-primary to-secondary px-8 py-3 rounded-full text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all transform">
              Entre em Contato
            </Link>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;