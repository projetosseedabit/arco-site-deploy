import CaseCard from "./CaseCard";
import { Case } from "./type";

const cases: Case[] = [
  {
    id: 1,
    category: "Design",
    title: "Cobertura Ronaldo",
    description: "O maior projeto de Design de Interiores da Arco, realizado para uma família em cobertura no Paiva.",
    tags: ["Interiores", "Residencial", "Alto Padrão"],
    image: "/images/Cobertura Ronaldo.jpg",
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
    title: "Análise de Solo Terreno Z",
    description: "Laudo técnico e projeto de reforço estrutural para edifício comercial de 15 andares da cidade.",
    tags: ["Estrutural", "Laudo Técnico", "Comercial"],
    image: "/images/hero-image.jpg", 
    categoryColor: "#10b981", // emerald-500
  },
  {
    id: 4,
    category: "Arquitetura",
    title: "Casa Sirinhaém",
    description: "Projeto de residência executada do zero à beira da praia em Sirinhaém-PE, focando no conforto familiar.",
    tags: ["Residencial", "Praia", "Obras"],
    image: "/images/Casa Sirinhaém.png",
    categoryColor: "#f97316", // orange-500
  },
  {
    id: 5,
    category: "Design",
    title: "Clube Náutico",
    description: "Projeto de interiores da academia e do novo “Memorial do Náutico”, localizado no estádio dos Aflitos.",
    tags: ["Interiores", "Comercial", "Esportivo"],
    image: "/images/Academia Náutico.jpg",
    categoryColor: "#3b82f6", // blue-500
  },
  {
    id: 6,
    category: "Arquitetura",
    title: "Casa do Alto",
    description: "Concepção externa e paisagismo de uma residência em Aldeia-PE, integrando conforto ao espaço verde.",
    tags: ["Paisagismo", "Residencial", "Externo"],
    image: "/images/Casa do Alto.jpg",
    categoryColor: "#f97316", // orange-500
  },
];

export default function CasesSection() {
  return (
    // ALTERAÇÃO AQUI: Mudado para 'bg-gray-50' para igualar às telas de Feedback e Contato
    <section id="cases" className="py-20 bg-gray-50">
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