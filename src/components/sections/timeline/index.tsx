import React from "react";
import { Flag, Users, FileText, BookOpen, Globe, DollarSign, Award, TrendingUp } from 'lucide-react';

type TimelineItemProps = {
  year: string;
  title: string;
  description: string;
  position?: string; 
  direction?: 'up' | 'down'; 
  icon: React.ComponentType<{ size?: number; className?: string }>;
  isLast?: boolean; 
};

// COMPONENTE PRO DESKTOP (HORIZONTAL) 
const TimelineItemDesktop = ({ year, title, description, position, direction, icon: Icon }: TimelineItemProps) => {
  const itemClasses = "absolute flex flex-col items-center w-32 xl:w-40 text-center";
  const circleClasses = `w-12 h-12 xl:w-14 xl:h-14 rounded-full bg-white border-4 border-[#3DBEBE] z-10 flex items-center justify-center shadow-md transition-transform hover:scale-110`; 
  const connectorClasses = "w-1 h-8 xl:h-10 bg-[#2A8080]";

  const style = {
    left: position,
    transform: 'translateX(-50%)',
  };

  if (direction === 'up') {
    return (
      <div className={itemClasses} style={{ ...style, bottom: '50%', marginBottom: '1.5rem' }}>
        <div className="mb-2 transition-all hover:-translate-y-1">
          <h3 className="font-bold text-gray-800 text-sm leading-tight">{title}</h3>
          <p className="text-xs text-gray-600 leading-snug mt-1 hidden xl:block">{description}</p>
        </div>
        <span className="font-bold text-lg xl:text-xl text-[#3DBEBE] my-2">{year}</span>
        <div className={`${circleClasses}`}>
          {Icon && <Icon size={24} className="text-[#3DBEBE]" />}
        </div>
        <div className={connectorClasses}></div>
      </div>
    );
  }

  return (
    <div className={itemClasses} style={{ ...style, top: '50%', marginTop: '1.5rem' }}>
      <div className={connectorClasses}></div>
      <div className={`${circleClasses}`}>
        {Icon && <Icon size={24} className="text-[#3DBEBE]" />}
      </div>
      <span className="font-bold text-lg xl:text-xl text-[#3DBEBE] my-2">{year}</span>
      <div className="mt-2 transition-all hover:translate-y-1">
        <h3 className="font-bold text-gray-800 text-sm leading-tight">{title}</h3>
        <p className="text-xs text-gray-600 leading-snug mt-1 hidden xl:block">{description}</p>
      </div>
    </div>
  );
};

// COMPONENTE PRO MOBILE (VERTICAL)
const TimelineItemMobile = ({ year, title, description, icon: Icon, isLast }: TimelineItemProps) => {
  return (
    <div className="flex gap-4 relative pb-12 last:pb-0">
      {/* Linha Conectora Vertical */}
      {!isLast && (
        <div className="absolute left-[22px] top-12 bottom-0 w-1 bg-[#2A8080]/30"></div>
      )}
      
      {/* Ícone/Bolinha */}
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-white border-4 border-[#3DBEBE] flex items-center justify-center shadow-sm relative z-10">
          {Icon && <Icon size={20} className="text-[#3DBEBE]" />}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="pt-1 pb-2">
        <span className="inline-block px-3 py-1 rounded bg-[#3DBEBE]/10 text-[#2A8080] text-sm font-bold mb-2">
          {year}
        </span>
        <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed max-w-xs">{description}</p>
      </div>
    </div>
  );
};

const TimeLine = () => {
  
  const items: TimelineItemProps[] = [
    { year: '2014', title: 'Fundação', description: 'Início na Arco Consultoria na UFPE', position: '8%', direction: 'up', icon: Flag },
    { year: '2017', title: 'Federação', description: 'A Arco se torna Empresa Júnior federada', position: '20%', direction: 'down', icon: Users },
    { year: '2017', title: '1º Projeto', description: 'Execução do nosso primeiro projeto', position: '32%', direction: 'up', icon: FileText },
    { year: '2020', title: 'ParqueTec', description: 'Participação do primeiro edital do ParqueTec', position: '44%', direction: 'down', icon: BookOpen },
    { year: '2021', title: 'Internacional', description: 'Execução do 1º projeto internacional', position: '56%', direction: 'up', icon: Globe },
    { year: '2022', title: '1 Milhão', description: 'Batemos o recorde de 1 milhão acumulado', position: '68%', direction: 'down', icon: DollarSign },
    { year: '2024', title: 'Cluster 5', description: 'Alcançamos o tão sonhado Cluster 5', position: '80%', direction: 'up', icon: Award },
    { year: '2025', title: '1.5 Milhões', description: 'Novo marco histórico alcançado', position: '92%', direction: 'down', icon: TrendingUp },
  ];

  return (
    <div className="relative w-full bg-gradient-to-b from-white via-[#E0F7F5] to-[#81D8D0] text-gray-800 py-24 px-4 sm:px-8 overflow-hidden">
      
      {/* --- Título e Cabeçalho --- */}
      <div className="text-center relative z-10 max-w-4xl mx-auto mb-16 md:mb-32">
        <span className="inline-block py-2 px-6 rounded-full bg-[#3DBEBE]/10 text-[#2A8080] font-bold text-xs uppercase tracking-wider mb-6 border border-[#3DBEBE]/20">
          Nossa Trajetória
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          Uma Jornada de Transformação
        </h2>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
          Mais de uma década transformando ideias em realidade e formando profissionais de excelência
        </p>
      </div>

      {/* VIEW DESKTOP (Horizontal) */}
      <div className="hidden lg:block w-full max-w-[1400px] mx-auto h-[500px] relative">
          {/* Linha Central */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-[#2A8080]/30 transform -translate-y-1/2 rounded-full"></div>
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-[#2A8080] to-[#3DBEBE] transform -translate-y-1/2 rounded-full origin-left"></div>
          
          {items.map((item, index) => (
            <TimelineItemDesktop key={index} {...item} />
          ))}
      </div>

      {/* VIEW MOBILE (Vertical) */}
      <div className="block lg:hidden max-w-md mx-auto pl-4">
          {items.map((item, index) => (
            <TimelineItemMobile 
              key={index} 
              {...item} 
              isLast={index === items.length - 1}
            />
          ))}
      </div>

    </div>
  );
}

export default TimeLine;