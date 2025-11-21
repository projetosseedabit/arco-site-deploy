import React from "react";
import { Target } from "lucide-react";

// Dados fictícios dos posts
const posts = [
  {
    id: 1,
    title: "Título",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: 2,
    title: "Título",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: 3,
    title: "Título",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#DEEFEF] relative overflow-x-hidden pt-32 pb-20">
       
       {/* Decoração Lateral Esquerda (Círculos) */}
       <div className="absolute left-0 top-40 -translate-x-1/2 pointer-events-none hidden lg:block">
         <div className="w-[300px] h-[300px] rounded-full border-[3px] border-[#6AC4C4] absolute top-0 left-0 opacity-60"></div>
         <div className="w-[350px] h-[350px] rounded-full border-[3px] border-[#6AC4C4] absolute top-[-25px] left-[-25px] opacity-60"></div>
         <div className="w-[400px] h-[400px] rounded-full border-[3px] border-[#6AC4C4] absolute top-[-50px] left-[-50px] opacity-60"></div>
      </div>

       {/* Decoração Lateral Direita Inferior (Círculos) */}
       <div className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 pointer-events-none hidden lg:block">
         <div className="w-[400px] h-[400px] rounded-full border-[3px] border-[#6AC4C4] absolute bottom-0 right-0 opacity-60"></div>
         <div className="w-[500px] h-[500px] rounded-full border-[3px] border-[#6AC4C4] absolute bottom-[-50px] right-[-50px] opacity-60"></div>
         <div className="w-[600px] h-[600px] rounded-full border-[3px] border-[#6AC4C4] absolute bottom-[-100px] right-[-100px] opacity-60"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Título da Página */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#3DBEBE] mb-12">
          Blog da Arco
        </h1>

        {/* Lista de Cards */}
        <div className="space-y-6 max-w-5xl">
          {posts.map((post) => (
            <div 
              key={post.id}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-transparent hover:border-[#3DBEBE]/20"
            >
              <div className="flex flex-col items-start gap-4">
                {/* Ícone */}
                <div className="text-[#5BBFB8]">
                    <Target size={36} strokeWidth={2} />
                </div>
                
                {/* Conteúdo */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-lg">
                    {post.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}