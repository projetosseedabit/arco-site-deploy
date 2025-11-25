import fs from 'fs/promises';
import path from 'path';

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  imageUrl?: string; // Novo campo para imagem
}

const dbPath = path.join(process.cwd(), 'src', 'data', 'posts.json');

// Helper para garantir que o diretório de uploads existe (para não dar erro ao salvar imagem)
async function ensureUploadsDir() {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  try {
    await fs.access(uploadsDir);
  } catch {
    await fs.mkdir(uploadsDir, { recursive: true });
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug);
}

// Criar ou Atualizar
export async function savePost(post: BlogPost): Promise<void> {
  const posts = await getAllPosts();
  const index = posts.findIndex((p) => p.id === post.id);

  if (index >= 0) {
    // Atualizar existente
    posts[index] = post;
  } else {
    // Criar novo (no topo da lista)
    posts.unshift(post);
  }
  
  await fs.writeFile(dbPath, JSON.stringify(posts, null, 2));
}

// Deletar
export async function deletePost(id: number): Promise<void> {
  const posts = await getAllPosts();
  const filteredPosts = posts.filter((p) => p.id !== id);
  await fs.writeFile(dbPath, JSON.stringify(filteredPosts, null, 2));
}

// Função auxiliar para salvar imagem no disco local
export async function saveImage(file: File): Promise<string> {
  await ensureUploadsDir();
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  // Cria um nome único para não sobrescrever
  const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
  const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
  
  await fs.writeFile(filePath, buffer);
  return `/uploads/${fileName}`; // Retorna o caminho para usar no <img src>
}