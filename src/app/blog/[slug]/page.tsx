import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import { getAllPosts, getPostBySlug } from "@/services/blogService";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; 

interface BlogPostProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostProps) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  if (!post) return { title: "Post não encontrado" };
  
  return {
    title: `${post.title} | Blog Arco`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      
      <article className="relative min-h-screen pt-32 pb-24 overflow-hidden bg-gradient-to-b from-white via-[#E0F7F5] to-[#81D8D0]">
        
        {/* SVG Decorativo Esquerdo (Otimizado) */}
        <Image
            src="/ArcoSVG1.svg"
            alt="Decorativo"
            width={300}
            height={300}
            className="hidden md:block absolute top-32 left-0 z-0 w-64 h-64 opacity-40 animate-float-left pointer-events-none"
        />
        {/* SVG Decorativo Direito (Otimizado) */}
        <Image
            src="/ArcoSVG1.svg"
            alt="Decorativo"
            width={400}
            height={400}
            className="hidden md:block absolute bottom-0 right-0 z-0 w-96 h-96 opacity-30 animate-float-right pointer-events-none rotate-180"
        />

        <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-[2rem] shadow-2xl p-6 md:p-12 border border-white/50">
                
                <Link href="/blog" className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-[#2A8080] mb-8 transition-colors group">
                    <div className="bg-gray-100 p-2 rounded-full mr-2 group-hover:bg-[#2A8080]/10 transition-colors">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> 
                    </div>
                    Voltar para o Blog
                </Link>

                <header className="text-center mb-12">
                    <div className="inline-block mb-6">
                        <span className="px-4 py-2 bg-[#3DBEBE]/10 text-[#2A8080] rounded-full text-xs font-bold uppercase tracking-wider border border-[#3DBEBE]/20">
                            {post.category}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-extrabold text-custom-gray mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 border-b border-gray-100 pb-8">
                        <span className="flex items-center gap-2">
                            <Calendar size={18} className="text-[#3DBEBE]"/> 
                            {post.date}
                        </span>
                        <span className="flex items-center gap-2">
                            <User size={18} className="text-[#3DBEBE]"/> 
                            {post.author}
                        </span>
                    </div>
                </header>
                
                <div 
                  className="prose prose-lg prose-teal mx-auto"
                  dangerouslySetInnerHTML={{ __html: post.content }} 
                />
            </div>
        </div>
      </article>
    </>
  );
}