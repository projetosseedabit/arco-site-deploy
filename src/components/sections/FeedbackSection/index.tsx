"use client";
import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import Image from 'next/image';

const feedbackData = [
  {
    stars: 5,
    comment: "O trabalho de identidade visual superou todas as expectativas. A equipe captou perfeitamente a essência do nosso restaurante e traduziu em um design incrível.",
    author: "Maria Carmen",
    role: "Proprietária - Restaurante Carmen",
    avatar: "/images/avatar1.jpg", // Substitua pelo caminho real da imagem
  },
  {
    stars: 5,
    comment: "A consultoria de design de interiores transformou nosso apartamento. O espaço ficou funcional, elegante e a nossa cara. Profissionais de altíssimo nível!",
    author: "João Silva",
    role: "Cliente Particular",
    avatar: "/images/avatar1.jpg", 
  },
  {
    stars: 5,
    comment: "O projeto estrutural que a Arco desenvolveu foi impecável. Segurança, precisão e um ótimo custo-benefício. Recomendo fortemente a equipe de engenharia.",
    author: "Carlos Andrade",
    role: "Diretor - Construtora Segura",
    avatar: "/images/avatar1.jpg", 
  },
    {
    stars: 5,
    comment: "Ficamos maravilhados com a nova identidade visual da nossa marca. A Arco conseguiu traduzir nossos valores em um design moderno e impactante.",
    author: "Sofia Pereira",
    role: "CEO - Tech Inova",
    avatar: "/images/avatar1.jpg", 
  },
];

type FeedbackCardProps = {
  stars: number;
  comment: string;
  author: string;
  role: string;
  avatar: string;
  isActive: boolean;
};

const FeedbackCard = ({ stars, comment, author, role, avatar, isActive }: FeedbackCardProps) => (
  <div className={`transition-all duration-500 ${isActive ? 'translate-y-4' : 'blur-sm scale-95 opacity-70'}`}>
    <div className="bg-white rounded-2xl p-8 shadow-lg relative w-full max-w-lg mx-auto border border-gray-100">
      <Quote className="absolute top-4 right-6 w-12 h-12 text-orange-100" />
      <div className="flex mb-4">
        {[...Array(stars)].map((_, i) => <Star key={i} className="w-5 h-5 text-orange-400 fill-orange-400" />)}
      </div>
      <p className="text-gray-600 mb-6 text-base leading-relaxed">“{comment}”</p>
      <div className="flex items-center">
        <Image src={avatar} alt={author} width={48} height={48} className="w-12 h-12 rounded-full mr-4 object-cover" />
        <div>
          <p className="font-bold text-gray-800">{author}</p>
          <p className="text-sm text-gray-500">{role}</p>
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
    }, 5000); // Passa a cada 5 segundos

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
            <div className="inline-block">
                {/*<span className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm border border-primary/20">
                    FEEDBACK
                </span>*/}
            </div>
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
            <div className="flex -ml-4 pt-4 pb-12" style={{ cursor: 'grab' }}>
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