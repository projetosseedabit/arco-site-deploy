import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Goal, Eye, Landmark } from "lucide-react";

const aboutData = [
  {
    icon: <Goal className="h-8 w-8 text-primary" />,
    title: "Nossa Missão",
    description: "Proporcionar vivência empresarial e capacitação profissional a universitários visando garantir um futuro de lideranças protagonistas capazes de desenvolver soluções de impacto em arquitetura, engenharia e design.",
  },
  {
    icon: <Eye className="h-8 w-8 text-primary" />,
    title: "Nossa Visão",
    description: "Ser referência no movimento empresa júnior, impactando o ecossistema empreendedor e formando líderes transformadores, conectando a universidade ao mercado.",
  },
  {
    icon: <Landmark className="h-8 w-8 text-primary" />,
    title: "Nossos Valores",
    description: "Compromisso com resultados, espírito de dono, paixão por aprender e ensinar, e colaboração como base para o sucesso do cliente e da equipe.",
  },
];

const AboutUs = () => {
  return (
    <section id="sobre-nos" className="bg-white py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <div className="inline-block">
                    <span className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm border border-primary/20">
                        SOBRE NÓS
                    </span>
                </div>
                <h2 className="mt-6 text-4xl sm:text-5xl font-bold text-custom-gray">
                    Sobre a Arco Consultoria
                </h2>
                <p className="mt-4 text-lg sm:text-xl text-custom-light-gray max-w-3xl mx-auto">
                    Somos uma Empresa Júnior da UFPE que conecta talento universitário com o mercado, oferecendo consultoria de alto nível em Design, Engenharia e Arquitetura.
                </p>
            </div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {aboutData.map((item, index) => (
                    <Card key={index} className="text-center shadow-lg rounded-xl p-6 border-0 bg-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-primary/40">
                        <CardHeader className="p-0 mb-4">
                            <div className="mx-auto bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center">
                                {item.icon}
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <CardTitle className="mb-2 text-2xl font-bold text-custom-gray">{item.title}</CardTitle>
                            <p className="text-custom-light-gray text-justify">{item.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </section>
  );
};

export default AboutUs;
