"use client";
import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
// import Image from 'next/image'; // Removido pois não usamos mais fotos

const feedbackData = [
  {
    stars: 5,
    comment: "Isso está formidável. Parabéns. A comunidade exulta de alegria pelo espetacular projeto arquitetônico. Essa nova imagem da igreja é simplesmente espetacular. Muito, mas muito obrigado pelo retorno da vossa parte. 2021 foi um dos anos mais importantes na minha vida pois conheci uma família fabulosa que é a Arco.",
    author: "Charles",
    role: "Projeto Missão São Miguel",
  },
  {
    stars: 5,
    comment: "No começo eu tinha dúvidas mas confiei na indicação de quem já conhecia o trabalho deles. E não houve arrependimentos, pois qualidade, pontualidade, compromisso e profissionalismo são características da Arco. Os prazos foram cumpridos e foram bastante atenciosos. Só tenho a agradecer.",
    author: "Weslley",
    role: "Projeto iPhone Store",
  },
  {
    stars: 5,
    comment: "Gostei bastante do atendimento durante a execução e também do projeto final. Fiquei satisfeito e recomendo!",
    author: "Elzo",
    role: "Projeto Apt. Boa Viagem",
  },
  {
    stars: 5,
    comment: "Foi um serviço surpreendente, não esperava tão boa qualidade. Gostei do resultado e com certeza indicarei a outras pessoas.",
    author: "Thiago",
    role: "Projeto Quarto Thiago",
  },
];

type FeedbackCardProps = {
  stars: number;
  comment: string;
  author: string;
  role: string;
  isActive: boolean;
};

const FeedbackCard = ({ stars, comment, author, role, isActive }: FeedbackCardProps) => (
  <div className={`transition-all duration-500 h-full ${isActive ? 'translate-y-4' : 'blur-sm scale-95 opacity-70'}`}>
    {/* O card continua branco, mas com sombra e borda para destacar do fundo branco da seção */}
    <div className="bg-white rounded-2xl p-8 shadow-lg relative w-full max-w-lg mx-auto border border-gray-100 flex flex-col justify-between h-full min-h-[300px]">
      {/* Ícone de aspas com a nova cor e opacidade para ficar sutil */}
      <Quote className="absolute top-4 right-6 w-12 h-12 text-[#EC7022]/20" />
      
      <div>
        <div className="flex mb-4">
            {/* Estrelas com a nova cor sólida */}
            {[...Array(stars)].map((_, i) => <Star key={i} className="w-5 h-5 text-[#EC7022] fill-[#EC7022]" />)}
        </div>
        <p className="text-gray-600 mb-6 text-base leading-relaxed italic">“{comment}”</p>
      </div>

      <div className="flex items-center pt-4 border-t border-gray-50">
        {/* Foto removida conforme solicitado */}
        <div>
          <p className="font-bold text-gray-800 text-lg">{author}</p>
          <p className="text-sm text-gray-500 font-medium">{role}</p>
        </div>
      </div>
    </div>
  </div>
);

export default function FeedbackSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center', skipSnaps: false });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect(); // Set initial state

    // Autoplay
    const autoplay = setInterval(() => {
        emblaApi.scrollNext();
    }, 6000); // Aumentei levemente para 6s pois alguns textos são longos

    return () => {
        clearInterval(autoplay);
        emblaApi.off('select', onSelect);
    }
  }, [emblaApi]);

  return (
    <section id="feedback" className="bg-gray-50 py-24 sm:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho Padronizado */}
        <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="mt-6 text-4xl sm:text-5xl font-bold text-custom-gray">
                O Que Dizem Nossos Clientes
            </h2>
            <p className="mt-4 text-lg sm:text-xl text-custom-light-gray max-w-2xl mx-auto">
                A satisfação dos nossos clientes é nosso maior reconhecimento. Veja o que eles têm a dizer sobre nosso trabalho.
            </p>
        </div>

        {/* Carrossel Embla */}
        <div className="relative">
          <div 
            className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
            ref={emblaRef}
          >
            <div className="flex -ml-4 pt-4 pb-12 items-stretch" style={{ cursor: 'grab' }}>
              {feedbackData.map((feedback, index) => (
                <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_40%] pl-4" key={index}>
                  <FeedbackCard {...feedback} isActive={index === selectedIndex} />
                </div>
              ))}
            </div>
          </div>

          {/* Botões de Navegação */}
          <button onClick={scrollPrev} className="absolute top-1/2 left-0 md:-left-4 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition z-10">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button onClick={scrollNext} className="absolute top-1/2 right-0 md:-right-4 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition z-10">
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
}