import CaseCard from "./CaseCard";
import { Case } from "./type";

const cases: Case[] = [
  {
    id: 1,
    category: "Design",
    title: "Coworking ParqueTec",
    description: "Laudo técnico e projeto de reforço estrutural para edifício comercial de 15 andares da cidade.",
    tags: ["Estrutural", "Laudo Técnico", "Comercial"],
    image: "/images/hero-image.jpg",
    categoryColor: "#3b82f6", // blue-500
  },
  {
    id: 2,
    category: "Arquitetura",
    title: "Missão São Miguel",
    description: "Laudo técnico e projeto de reforço estrutural para edifício comercial de 15 andares da cidade.",
    tags: ["Estrutural", "Laudo Técnico", "Comercial"],
    image: "/images/hero-image.jpg",
    categoryColor: "#f97316", // orange-500
  },
  {
    id: 3,
    category: "Engenharia",
    title: "Reforma Estrutural Edifício Centro",
    description: "Laudo técnico e projeto de reforço estrutural para edifício comercial de 15 andares da cidade.",
    tags: ["Estrutural", "Laudo Técnico", "Comercial"],
    image: "/images/hero-image.jpg",
    categoryColor: "#10b981", // emerald-500
  },
  {
    id: 4,
    category: "Design",
    title: "Identidade Visual Empresa X",
    description: "Laudo técnico e projeto de reforço estrutural para edifício comercial de 15 andares da cidade.",
    tags: ["Estrutural", "Laudo Técnico", "Comercial"],
    image: "/images/hero-image.jpg",
    categoryColor: "#3b82f6", // blue-500
  },
  {
    id: 5,
    category: "Arquitetura",
    title: "Projeto Residencial Y",
    description: "Laudo técnico e projeto de reforço estrutural para edifício comercial de 15 andares da cidade.",
    tags: ["Estrutural", "Laudo Técnico", "Comercial"],
    image: "/images/hero-image.jpg",
    categoryColor: "#f97316", // orange-500
  },
  {
    id: 6,
    category: "Engenharia",
    title: "Análise de Solo Terreno Z",
    description: "Laudo técnico e projeto de reforço estrutural para edifício comercial de 15 andares da cidade.",
    tags: ["Estrutural", "Laudo Técnico", "Comercial"],
    image: "/images/hero-image.jpg",
    categoryColor: "#10b981", // emerald-500
  },
];

export default function CasesSection() {
  return (
    <section id="cases" className="py-20 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm border border-primary/20">
            PORTFÓLIO
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mt-4">Cases</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Conheça os projetos que nos tornaram referência em soluções de Design, Engenharia e Arquitetura
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {cases.map((caseItem) => (
            <CaseCard key={caseItem.id} case={caseItem} />
          ))}
        </div>
      </div>
    </section>
  );
}
