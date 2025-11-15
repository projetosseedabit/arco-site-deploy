"use client"

import React from 'react'
import { Palette, Building2, Hammer } from 'lucide-react'
import ServiceCard from './ServiceCard'
import type { Service } from './type'

const services: Service[] = [
  {
    id: 1,
    title: 'Design',
    description:
      'Soluções criativas e inovadoras em design gráfico, identidade visual, UX/UI e branding focadas em fortalecer marcas e gerar experiências memoráveis.',
    items: ['Identidade Visual', 'Social Media', 'Materiais Promocionais'],
    color: '#E585D8',
    iconBg: '#E585D8',
    icon: <Palette className="w-6 h-6" />,
    detailedDescription: 'Descrição longa do serviço 1',
  },
  {
    id: 2,
    title: 'Arquitetura',
    description:
      'Projetos arquitetônicos funcionais e esteticamente marcantes.',
    items: ['Projeto Arquitetônico', 'Design de Interiores', 'Concepção Externa'],
    color: '#FF9F5A',
    iconBg: '#FF9F5A',
    icon: <Building2 className="w-6 h-6" />,
    detailedDescription: 'Descrição longa do serviço 2',
  },
  {
    id: 3,
    title: 'Engenharia',
    description:
      'Soluções técnicas e seguras em engenharia, garantindo qualidade, eficiência e sustentabilidade em cada etapa do projeto.',
    items: ['Projeto Estrutural', 'Projeto Elétrico', 'Projeto Hidrossanitário'],
    color: '#5B9FD8',
    iconBg: '#5B9FD8',
    icon: <Hammer className="w-6 h-6" />,
    detailedDescription: 'Descrição longa do serviço 3',
  },
]

export default function ServicesSection() {
  return (
    <section className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(180deg, #A0D8D8 0%, #6EC9C9 100%)' }}>
      <div className="absolute left-0 top-20 opacity-20 pointer-events-none">
        <svg width="120" height="200" viewBox="0 0 120 200" fill="none">
          <path d="M0 0Q40 50 0 100" stroke="currentColor" strokeWidth="2" />
          <path d="M20 0Q60 50 20 100" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute right-0 top-20 opacity-20 pointer-events-none">
        <svg width="120" height="200" viewBox="0 0 120 200" fill="none">
          <path d="M120 0Q80 50 120 100" stroke="currentColor" strokeWidth="2" />
          <path d="M100 0Q60 50 100 100" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <span className="inline-block text-[11px] px-3 py-1 rounded-full bg-white/30 text-white mb-3 font-semibold">NOSSOS SERVIÇOS</span>
        <h2 className="text-4xl font-bold text-white mb-3">Serviços que Impactam</h2>
        <p className="text-sm text-white/90 max-w-2xl mx-auto mb-12">Mais de uma década transformando ideias em realidade e formando profissionais de excelência</p>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-8">
          {services.map((s) => (
            <ServiceCard
              key={s.id}
              title={s.title}
              description={s.description}
              features={s.items}
              color={s.color}
              icon={s.icon}
            />
          ))}
        </div>

        <p className="text-sm text-white/80 mb-6">Não encontrou o que procura? Clique em contato conosco</p>
        <button className="inline-block text-white bg-gradient-to-r from-[#3DBEBE] to-[#A9C229] px-6 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors">Entre em Contato</button>
      </div>
    </section>
  )
}