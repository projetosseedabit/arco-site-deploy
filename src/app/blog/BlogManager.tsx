"use client";

import React, { useState } from "react";
import BlogCard from "./blogCard";
import { Plus, X, Upload } from "lucide-react";
import { BlogPost } from "@/services/blogService";
import { handlePostAction, handleDeleteAction } from "@/app/actions";

interface BlogManagerProps {
  initialPosts: BlogPost[];
}

export default function BlogManager({ initialPosts }: BlogManagerProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);

  // Fecha form e limpa estado após salvar
  const handleSubmit = async (formData: FormData) => {
    await handlePostAction(formData);
    setIsFormOpen(false);
    setEditingPost(null);
  };

  // Função chamada pelo botão de editar do Card
  const startEditing = (post: Partial<BlogPost>) => {
    setEditingPost(post);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Função chamada pelo botão de deletar do Card
  const deletePost = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este post?")) {
        await handleDeleteAction(id);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto relative z-10">
      
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        {/* Correção do Título Cortado: Adicionado pb-2 e leading-normal */}
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent pb-2 leading-tight">
          Blog da Arco
        </h1>
        
        <button 
          onClick={() => {
            setIsFormOpen(!isFormOpen);
            setEditingPost(null); // Limpa edição se fechar/abrir
          }}
          className="flex items-center gap-2 bg-[#2A8080] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#1e6060] transition-colors shadow-lg text-sm"
        >
          {isFormOpen ? <X size={18}/> : <Plus size={18}/>}
          {isFormOpen ? "Cancelar" : "Novo Post"}
        </button>
      </div>

      {/* Formulário (Criação e Edição) */}
      {isFormOpen && (
        <div className="bg-white p-6 rounded-xl shadow-xl mb-12 animate-in fade-in slide-in-from-top-4 border border-[#2A8080]/20">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
                {editingPost ? "Editar Post" : "Escrever novo artigo"}
            </h3>
            
            <form action={handleSubmit} className="space-y-4">
                {/* Campo oculto para ID se for edição */}
                {editingPost && <input type="hidden" name="id" value={editingPost.id} />}
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                    <input 
                        name="title"
                        type="text" 
                        required
                        defaultValue={editingPost?.title || ""}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2A8080] outline-none"
                        placeholder="Título do post..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Imagem de Capa</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-[#2A8080] transition-colors relative">
                        <input 
                            name="image"
                            type="file" 
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center text-gray-500">
                            <Upload size={24} className="mb-2"/>
                            <span className="text-sm">Clique para upload da imagem</span>
                        </div>
                    </div>
                    {editingPost?.imageUrl && (
                        <p className="text-xs text-gray-400 mt-1">Imagem atual: {editingPost.imageUrl}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo</label>
                    <textarea 
                        name="content"
                        required
                        rows={6}
                        defaultValue={editingPost?.content?.replace(/<[^>]*>?/gm, '') || ""} // Remove tags HTML básicas pra editar texto puro
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2A8080] outline-none"
                        placeholder="Escreva aqui..."
                    />
                </div>
                <button type="submit" className="w-full bg-[#2A8080] text-white py-3 rounded-lg font-bold hover:bg-[#1e6060] transition-colors">
                    {editingPost ? "Atualizar Post" : "Publicar Post"}
                </button>
            </form>
        </div>
      )}

      {/* Lista */}
      <div className="flex flex-col gap-6">
        {initialPosts.map((post) => (
          <BlogCard 
            key={post.id}
            id={post.id}
            slug={post.slug}
            title={post.title}
            excerpt={post.excerpt}
            content={post.content}
            imageUrl={post.imageUrl}
            onDelete={deletePost}
            onEdit={startEditing}
          />
        ))}
      </div>
    </div>
  );
}