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

// Função robusta para formatar data ignorando fuso horário
const formatDate = (dateString: string) => {
  if (!dateString) return "";

  const months = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
  ];

  let day, month, year;

  // Verifica formato ISO (YYYY-MM-DD)
  if (dateString.includes('-')) {
    const parts = dateString.split('-');
    if (parts.length === 3) {
      year = parseInt(parts[0]);
      month = parseInt(parts[1]) - 1; // Meses em JS são 0-11
      day = parseInt(parts[2]);
    }
  } 
  // Verifica formato brasileiro (DD/MM/YYYY)
  else if (dateString.includes('/')) {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      day = parseInt(parts[0]);
      month = parseInt(parts[1]) - 1;
      year = parseInt(parts[2]);
    }
  }

  // Se conseguiu extrair os dados corretamente
  if (day !== undefined && month !== undefined && year !== undefined) {
    if (!isNaN(day) && !isNaN(month) && !isNaN(year) && months[month]) {
      return `${day} de ${months[month]} de ${year}`;
    }
  }

  // Fallback caso não consiga formatar
  return dateString;
};

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
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.imageUrl ? [{ url: post.imageUrl }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#E0F7F5] overflow-hidden">
      <Header />
      
      {/* Hero com Imagem de Capa */}
      <section className="relative w-full overflow-hidden pt-20">
        {post.imageUrl ? (
          <div className="relative w-full h-[500px] md:h-[600px]">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover brightness-75"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          </div>
        ) : (
          <div className="w-full h-[400px] bg-gradient-to-r from-[#2A8080] to-[#3DBEBE]"></div>
        )}

        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl pb-16">
            <div className="mb-6">
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium"
              >
                <ArrowLeft size={16} />
                Voltar ao Blog
              </Link>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-8 text-white/90 text-sm md:text-base">
              {post.date && (
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-[#3DBEBE]" />
                  <time dateTime={post.date}>
                    {formatDate(post.date)}
                  </time>
                </div>
              )}
              {post.author && (
                <div className="flex items-center gap-2">
                  <User size={18} className="text-[#3DBEBE]" />
                  <span>{post.author}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <article className="bg-white pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl pt-20">
          
          <div 
            className="prose prose-lg max-w-none
              prose-headings:text-gray-900 prose-headings:font-bold
              prose-h1:text-4xl prose-h1:mt-12 prose-h1:mb-6
              prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-3
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-[#2A8080]
              prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-2
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-[#2A8080] prose-a:font-medium prose-a:underline hover:prose-a:text-[#1e6060] hover:prose-a:no-underline
              prose-strong:text-gray-900 prose-strong:font-bold
              prose-em:text-gray-700 prose-em:italic prose-em:not-italic:before:content-[open-quote] prose-em:not-italic:after:content-[close-quote]
              prose-img:rounded-lg prose-img:my-8 prose-img:shadow-xl prose-img:border prose-img:border-gray-200
              prose-code:bg-gray-100 prose-code:px-3 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:text-red-600 prose-code:font-mono
              prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-6 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:shadow-lg prose-pre:border prose-pre:border-gray-800
              prose-pre:code:bg-transparent prose-pre:code:text-gray-100 prose-pre:code:p-0
              prose-blockquote:border-l-4 prose-blockquote:border-[#3DBEBE] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:bg-gray-50 prose-blockquote:py-4 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:my-6
              prose-ul:list-disc prose-ul:pl-8 prose-ul:my-6
              prose-ol:list-decimal prose-ol:pl-8 prose-ol:my-6
              prose-li:text-gray-700 prose-li:my-3 prose-li:leading-relaxed
              prose-hr:border-gray-300 prose-hr:my-12
              prose-table:border-collapse prose-table:w-full prose-table:my-6
              prose-thead:bg-gray-100
              prose-th:border prose-th:border-gray-300 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-bold
              prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-3"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-20 pt-12 border-t border-gray-300">
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Escrito por</p>
                <p className="text-lg font-bold text-gray-900">{post.author || 'Arco Consultoria'}</p>
              </div>
              
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2A8080] text-white rounded-lg font-medium hover:bg-[#1e6060] transition-colors"
              >
                Voltar ao Blog
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}