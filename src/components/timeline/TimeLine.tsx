import React from "react";
import {Flag, Users, FileText, BookOpen, Globe, DollarSign, Award, TrendingUp} from 'lucide-react';

//Componente do marco da linha do tempo
type TimelineItemProps = {
  year: string;
  title: string;
  description: string;
  position: string;
  direction: 'up' | 'down';
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const TimelineItem = ({ year, title, description, position, direction, icon: Icon }: TimelineItemProps) => {
  const itemClasses = "absolute flex flex-col items-center w-32 md:w-40 text-center";
  const circleClasses = `w-12 h-12 rounded-full bg-white border-4 border-[#3DBEBE] z-10 flex items-center justify-center`;
  const connectorClasses = "w-1 h-8 bg-[#2A8080]";

//Posicionamento dos marcos
const style = {
    left: position,
    transform: 'translateX(-50%)',
  };

  if (direction === 'up') {
    return (
      <div className={itemClasses} style={{ ...style, bottom: '50%', marginBottom: '1.5rem' }}>
        {/* TEXTO */}
        <div>
          <h3 className="font-bold text-gray-800 text-sm md:text-base">{title}</h3>
          <p className="text-xs md:text-sm text-gray-600">{description}</p>
        </div>
        {/* ANO */}
        <span className="font-bold text-lg text-[#3DBEBE] mt-2">{year}</span>
        {/* CÍRCULO */}
        <div className={`${circleClasses} mt-2`}>
          {Icon && <Icon size={20} className="text-[#3DBEBE]" />}
        </div>
        {/* CONECTOR */}
        <div className={connectorClasses}></div>
      </div>
    );
  }

  return (
    <div className={itemClasses} style={{ ...style, top: '50%', marginTop: '1.5rem' }}>
      {/* Conector */}
      <div className={connectorClasses}></div>
      {/* O círculo com ícone */}
      <div className={`${circleClasses}`}>
        {Icon && <Icon size={20} className="text-[#3DBEBE]" />}
      </div>
      {/* ANO */}
      <span className="font-bold text-lg text-[#3DBEBE] mt-2">{year}</span>
      {/* Texto do marco */}
      <div className="mt-2">
        <h3 className="font-bold text-gray-800 text-sm md:text-base">{title}</h3>
        <p className="text-xs md:text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const TimeLine = () => {
  const items = [
    { year: '2014', title: 'Fundação', description: 'Início na Arco Consultoria na UFPE', position: '8%', direction: 'up', icon: Flag },
    { year: '2017', title: 'Federação', description: 'A Arco se torna Empresa Júnior federada pela FEJEPE', position: '20%', direction: 'down', icon: Users },
    { year: '2017', title: '1º Projeto', description: 'Execução do nosso primeiro projeto', position: '32%', direction: 'up', icon: FileText },
    { year: '2020', title: '1º Edital do ParqueTec', description: 'Participação do primeiro edital do ParqueTec', position: '44%', direction: 'down', icon: BookOpen },
    { year: '2021', title: '1º Projeto Internacional', description: 'Execução do nosso primeiro projeto internacional', position: '56%', direction: 'up', icon: Globe },
    { year: '2022', title: 'Faturamento Total de 1 milhão', description: 'Batemos o recorde de 1mi', position: '68%', direction: 'down', icon: DollarSign },
    { year: '2024', title: 'Arco Cluster 5', description: 'Alcançamos o tão sonhado Cluster 5', position: '80%', direction: 'up', icon: Award },
    { year: '2025', title: 'Faturamento Total de 1.5 milhão', description: 'Início da Arco Consultoria no UFPE', position: '92%', direction: 'down', icon: TrendingUp },
  ];

  return (
    // Fundo com o gradiente (deixei com uma transição bem livinha pro azul da arco)
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-white via-white to-[#3DBEBE]/20 text-gray-800 py-20 px-4 sm:px-8">
      

      <div className="text-center">
        <span className="inline-block bg-[#3DBEBE]/20 text-[#3DBEBE] text-sm font-semibold tracking-wider px-5 py-2 rounded-full">
          NOSSA TRAJETÓRIA
        </span>
        <h1 className="text-black text-4xl font-extrabold text-center mt-4">Uma Jornada de Transformação</h1>
        <div className="max-w-xl mx-auto text-center mt-4">
          <p className="text-center text-gray-600">Mais de uma década transformando ideias em realidade e formando profissionais de excelência</p>
        </div>
      </div>

      <div className="w-full max-w-7xl mt-32">
        <div className="relative w-full h-96 mx-auto">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-[#2A8080] transform -translate-y-1/2"></div>
          
          {items.map((item, index) => (
            <TimelineItem key={index} {...item} direction={item.direction as 'up' | 'down'} />
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default TimeLine;