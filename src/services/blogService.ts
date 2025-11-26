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
  imageUrl?: string;
}

const dbPath = path.join(process.cwd(), 'data', 'posts.json');

//Garante pasta de uploads
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

    //debug
    console.log("📂 Tentando ler arquivo em:", dbPath);

    const data = await fs.readFile(dbPath, 'utf-8');
    
    console.log("✅ Arquivo lido com sucesso. Tamanho:", data.length);
    
    const parsedData = JSON.parse(data);
    return parsedData;

  } catch (error) {
    console.error("❌ ERRO GRAVE ao ler posts.json:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  // Decodifica o slug caso venha com caracteres especiais da URL
  const decodedSlug = decodeURIComponent(slug);
  const posts = await getAllPosts();
  const found = posts.find((post) => post.slug === decodedSlug);
  if (!found) {
    console.log(`⚠️ Post não encontrado. Procurado: "${decodedSlug}". Disponíveis:`, posts.map(p => p.slug));
  }
  
  return found;
}

export async function savePost(post: BlogPost): Promise<void> {
  const posts = await getAllPosts();
  const index = posts.findIndex((p) => p.id === post.id);

  if (index >= 0) {
    posts[index] = post;
  } else {
    posts.unshift(post);
  }
  
  await fs.writeFile(dbPath, JSON.stringify(posts, null, 2));
}

export async function deletePost(id: number): Promise<void> {
  const posts = await getAllPosts();
  const filteredPosts = posts.filter((p) => p.id !== id);
  await fs.writeFile(dbPath, JSON.stringify(filteredPosts, null, 2));
}

export async function saveImage(file: File): Promise<string> {
  await ensureUploadsDir();
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
  const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
  
  await fs.writeFile(filePath, buffer);
  return `/uploads/${fileName}`;
}