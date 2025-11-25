import React from "react";
import Link from "next/link";
import { Target, Trash2, Edit } from "lucide-react";
import Image from "next/image";

interface BlogPostProps {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl?: string;
  content?: string; // Preciso disso para preencher o form de edição
  onDelete: (id: number) => void;
  onEdit: (post: any) => void;
}

const BlogCard = ({ id, slug, title, excerpt, imageUrl, content, onDelete, onEdit }: BlogPostProps) => {
  return (
    <div className="group block w-full relative">
      <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-transparent w-full mb-6 relative overflow-hidden flex flex-col md:flex-row gap-6 items-start">
        
        {/* Imagem do Post (se existir) */}
        {imageUrl && (
          <div className="w-full md:w-48 h-48 relative flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
             <Image 
               src={imageUrl} 
               alt={title} 
               fill 
               className="object-cover"
             />
          </div>
        )}

        {/* Conteúdo */}
        <div className="flex-1 flex flex-col items-start gap-4 w-full">
            {!imageUrl && (
                <div className="p-2 bg-[#E0F7F5] rounded-full text-[#2A8080]">
                    <Target size={24} strokeWidth={2} />
                </div>
            )}
            
            <Link href={`/blog/${slug}`} className="w-full">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#2A8080] transition-colors">
                {title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-base line-clamp-3">
                {excerpt}
                </p>
            </Link>
        </div>

        {/* Botões de Ação (Editar/Deletar) */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
                onClick={() => onEdit({ id, title, content: content || excerpt, imageUrl })} // Passa dados pro form
                className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100"
                title="Editar"
            >
                <Edit size={18} />
            </button>
            <button 
                onClick={() => onDelete(id)}
                className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100"
                title="Deletar"
            >
                <Trash2 size={18} />
            </button>
        </div>

      </div>
    </div>
  );
};

export default BlogCard;