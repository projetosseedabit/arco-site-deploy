import React from "react";
import Link from "next/link";
import { Target, ArrowRight, Calendar } from "lucide-react";

interface BlogPostProps {
  id: number;
  title: string;
  excerpt: string;
  date: string;
}

const BlogCard = ({ id, title, excerpt, date }: BlogPostProps) => {
  return (
    <Link href={`/blog/${id}`} className="group block h-full">
      <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#3DBEBE]/20 h-full flex flex-col transform hover:-translate-y-1">
        
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-[#DEEFEF] rounded-lg text-[#3DBEBE] group-hover:bg-[#3DBEBE] group-hover:text-white transition-colors">
             <Target size={28} strokeWidth={2} />
          </div>
          <span className="flex items-center text-xs text-gray-400 font-medium bg-gray-50 px-3 py-1 rounded-full">
             <Calendar size={12} className="mr-1" />
             {date}
          </span>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#3DBEBE] transition-colors line-clamp-2">
          {title}
        </h3>
        
        <p className="text-gray-500 leading-relaxed text-base mb-6 flex-grow line-clamp-3">
          {excerpt}
        </p>

        <div className="flex items-center text-[#3DBEBE] font-semibold text-sm mt-auto">
          Ler artigo completo
          <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;