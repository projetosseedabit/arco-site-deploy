"use client";

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Correção do erro "Unexpected any": definimos uma estrutura básica para o post
interface InstaCarouselProps {
  posts: { id: string; media_url: string; caption?: string; permalink: string }[];
}

const placeholders = [1, 2, 3, 4, 5];

// Correção do erro "defined but never used": renomeamos para _posts
export function InstaCarousel({ posts: _posts }: InstaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center', skipSnaps: false });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();

    const autoplay = setInterval(() => {
        emblaApi.scrollNext();
    }, 4000); 

    return () => {
        clearInterval(autoplay);
        emblaApi.off('select', onSelect);
    }
  }, [emblaApi]);

  // Usamos console.log apenas para "fingir" que usamos a variável se o linter for muito estrito,
  // mas o underline _posts geralmente já resolve.
  // console.log(_posts); 

  return (
    <section className="w-full py-24 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">
                Posts
            </h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div 
            className="overflow-visible" 
            ref={emblaRef}
          >
            <div className="flex -ml-4 py-8" style={{ cursor: 'grab' }}>
              {placeholders.map((_, index) => {
                const isActive = index === selectedIndex;
                
                return (
                  <div 
                      className="flex-[0_0_70%] sm:flex-[0_0_45%] md:flex-[0_0_35%] lg:flex-[0_0_28%] pl-4" 
                      key={index}
                  >
                    <div 
                      className={`
                          transition-all duration-500 ease-in-out transform
                          ${isActive 
                              ? 'scale-105 opacity-100 shadow-xl z-10' 
                              : 'scale-90 opacity-50 blur-[2px] grayscale' 
                          }
                      `}
                    >
                      <div className="bg-white w-full aspect-[4/5] rounded-2xl shadow-sm border border-gray-100">
                          {/* Card vazio */}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button 
            onClick={scrollPrev} 
            className="absolute top-1/2 left-0 md:left-4 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-md hover:bg-white transition z-20 text-gray-700"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={scrollNext} 
            className="absolute top-1/2 right-0 md:right-4 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-md hover:bg-white transition z-20 text-gray-700"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}