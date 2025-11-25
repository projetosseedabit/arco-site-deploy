import Header from "@/components/layout/Header";
import { getAllPosts } from "@/services/blogService";
import BlogManager from "./BlogManager";

const DecorativeCircles = () => (
  <div className="relative w-[500px] h-[500px] flex items-center justify-center pointer-events-none select-none">
    <div className="absolute w-[100%] h-[100%] border-[8px] border-[#6AC9C9] rounded-full opacity-40"></div>
    <div className="absolute w-[85%] h-[85%] border-[8px] border-[#6AC9C9] rounded-full opacity-40"></div>
    <div className="absolute w-[70%] h-[70%] border-[8px] border-[#6AC9C9] rounded-full opacity-40"></div>
  </div>
);

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    // CORREÇÃO DO SCROLL: Adicionei 'overflow-hidden' aqui.
    // Isso corta qualquer elemento que tente sair da largura da tela (como os círculos laterais)
    // removendo a barra de rolagem horizontal indesejada.
    <div className="min-h-screen relative bg-[#E0F7F5] overflow-hidden font-sans">
      <Header />

      {/* Esquerda */}
      <div className="absolute top-[200px] -left-[250px] z-0 pointer-events-none">
        <DecorativeCircles />
      </div>

      {/* Direita Inferior */}
      <div className="absolute -bottom-[200px] -right-[200px] z-0 pointer-events-none">
         <DecorativeCircles />
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-20 relative z-10">
         <BlogManager initialPosts={posts} />
      </main>
    </div>
  );
}