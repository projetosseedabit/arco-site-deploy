'use server'

import { savePost, deletePost, saveImage, BlogPost, getAllPosts } from "@/services/blogService";
import { revalidatePath } from "next/cache";

export async function handlePostAction(formData: FormData) {
  const id = formData.get("id"); // Se tiver ID, é edição
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const imageFile = formData.get("image") as File;

  if (!title || !content) return;

  // Recupera posts antigos para manter dados se for edição
  const posts = await getAllPosts();
  const existingPost = id ? posts.find(p => p.id === Number(id)) : null;

  let imageUrl = existingPost?.imageUrl || "";

  // Se o usuário enviou uma nova imagem, salva e atualiza a URL
  if (imageFile && imageFile.size > 0) {
    imageUrl = await saveImage(imageFile);
  }

  const post: BlogPost = {
    id: existingPost ? existingPost.id : Date.now(),
    slug: title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "-"),
    title: title,
    excerpt: content.substring(0, 150) + "...", // Atualiza o resumo
    content: existingPost ? content : `<p>${content.replace(/\n/g, "<br/>")}</p>`, // Mantém HTML simples
    date: existingPost ? existingPost.date : new Date().toLocaleDateString("pt-BR"),
    author: "Admin",
    category: "Geral",
    imageUrl: imageUrl
  };

  await savePost(post);
  revalidatePath("/blog");
}

export async function handleDeleteAction(id: number) {
  await deletePost(id);
  revalidatePath("/blog");
}