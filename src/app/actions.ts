'use server'

import { savePost, deletePost, saveImage, BlogPost, getAllPosts } from "@/services/blogService";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "./auth-actions"; // Importe a verificação

export async function handlePostAction(formData: FormData) {
  // 1. VERIFICAÇÃO DE SEGURANÇA
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
    throw new Error("Acesso negado. Você não é administrador.");
  }

  const id = formData.get("id");
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const imageFile = formData.get("image") as File;

  if (!title || !content) return;

  const posts = await getAllPosts();
  const existingPost = id ? posts.find(p => p.id === Number(id)) : null;

  let imageUrl = existingPost?.imageUrl || "";

  if (imageFile && imageFile.size > 0) {
    imageUrl = await saveImage(imageFile);
  }

  const post: BlogPost = {
    id: existingPost ? existingPost.id : Date.now(),
    slug: title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "-"),
    title: title,
    excerpt: content.substring(0, 150) + "...",
    content: existingPost ? content : `<p>${content.replace(/\n/g, "<br/>")}</p>`,
    date: existingPost ? existingPost.date : new Date().toLocaleDateString("pt-BR"),
    author: "Admin",
    category: "Geral",
    imageUrl: imageUrl
  };

  await savePost(post);
  revalidatePath("/blog");
}

export async function handleDeleteAction(id: number) {
  // 2. VERIFICAÇÃO DE SEGURANÇA
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
    throw new Error("Acesso negado.");
  }

  await deletePost(id);
  revalidatePath("/blog");
}