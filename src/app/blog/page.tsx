import Header from "@/components/layout/Header";
import { getAllPosts } from "@/services/blogService";
import BlogManager from "./BlogManager";
import { isAdminAuthenticated } from "@/app/auth-actions"; 
import LoginTrigger from "./loginTrigger"; 


const DecorativeCircles = () => (
  <div className="relative w-[500px] h-[500px] flex items-center justify-center pointer-events-none select-none">
    <div className="absolute w-[100%] h-[100%] border-[8px] border-[#6AC9C9] rounded-full opacity-40"></div>
    <div className="absolute w-[85%] h-[85%] border-[8px] border-[#6AC9C9] rounded-full opacity-40"></div>
    <div className="absolute w-[70%] h-[70%] border-[8px] border-[#6AC9C9] rounded-full opacity-40"></div>
  </div>
);

export const metadata = {
  title: "Blog | Arco Consultoria",
  description: "Artigos e novidades sobre Engenharia, Arquitetura e Design.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const isLoggedIn = await isAdminAuthenticated();

  return (
    <div className="min-h-screen relative bg-[#E0F7F5] overflow-hidden font-sans pb-32">
      <Header />

      <div className="absolute top-[200px] -left-[250px] z-0 pointer-events-none">
        <DecorativeCircles />
      </div>

      <div className="absolute -bottom-[200px] -right-[200px] z-0 pointer-events-none">
         <DecorativeCircles />
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-20 relative z-10">
         <BlogManager initialPosts={posts} isLoggedIn={isLoggedIn} />
      </main>

      {!isLoggedIn && (
        <div className="fixed bottom-6 right-8 z-50 opacity-40 hover:opacity-100 transition-opacity duration-300">
           <LoginTrigger />
        </div>
      )}
    </div>
  );
}