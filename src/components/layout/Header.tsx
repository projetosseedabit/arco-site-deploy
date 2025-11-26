"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      // Mantivemos sua lógica de 10px para resposta rápida
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const smoothScrollTo = (targetId: string) => {
    const target = document.getElementById(targetId);
    if (target) {
      const headerOffset = 85;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1500;
      let startTime: number | null = null;

      const ease = (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };

      requestAnimationFrame(animation);
    } else {
      router.push(`/#${targetId}`);
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    setMenuOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      smoothScrollTo(targetId);
    }
  };

  // CORREÇÃO: Verifica se é Home OU se começa com /blog (para valer nos posts também)
  const isTransparentPage = pathname === "/" || pathname.startsWith("/blog");
  
  const headerClass = isScrolled || menuOpen || !isTransparentPage
    ? "bg-white/90 backdrop-blur-md text-gray-800 shadow-md" // Adicionei backdrop-blur para ficar moderno
    : "bg-transparent text-gray-800"; 

  return (
    <header className={`w-full flex top-0 fixed z-50 transition-all duration-300 ease-in-out items-center justify-between px-8 md:px-20 py-4 ${headerClass}`}>
      <div className="logo z-50">
        <Link href="/#inicio" onClick={(e) => handleLinkClick(e, "inicio")}>
            {/* Ajustei para width/height auto para não distorcer */}
            <Image src="/logoArco.svg" alt="Logo Arco" width={120} height={40} className="h-8 w-auto cursor-pointer" />
        </Link>
      </div>

      <nav className={`flex flex-col md:flex-row items-end md:items-center md:gap-8 gap-4 md:static absolute top-16 left-0 w-full md:w-auto bg-[#f2f2f2] md:bg-transparent px-8 md:px-0 py-8 md:py-0 transition-all duration-300 ease-in-out ${menuOpen ? "opacity-100 translate-y-0 pointer-events-auto md:shadow-none" : "opacity-0 -translate-y-4 pointer-events-none md:opacity-100 md:translate-y-0 md:pointer-events-auto"}`}>
        <ul className="flex flex-col md:flex-row list-none gap-4 md:gap-8 text-gray-800 font-medium">
          <li><Link href="/#inicio" className="hover:text-[#1d7a7a] transition-colors" onClick={(e) => handleLinkClick(e, "inicio")}>Início</Link></li>
          <li><Link href="/#sobre-nos" className="hover:text-[#1d7a7a] transition-colors" onClick={(e) => handleLinkClick(e, "sobre-nos")}>Sobre nós</Link></li>
          <li><Link href="/#servicos" className="hover:text-[#1d7a7a] transition-colors" onClick={(e) => handleLinkClick(e, "servicos")}>Serviços</Link></li>
          <li><Link href="/#portfolio" className="hover:text-[#1d7a7a] transition-colors" onClick={(e) => handleLinkClick(e, "portfolio")}>Portfólio</Link></li>
          <li><Link href="/blog" className="hover:text-[#1d7a7a] transition-colors" onClick={() => setMenuOpen(false)}>Blog</Link></li>
        </ul>

        <Link href="/#contato" onClick={(e) => handleLinkClick(e, "contato")} className="bg-[#28b9b4] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#22a19b] hover:scale-105 transition whitespace-nowrap shadow-none">
          Fale com a gente
        </Link>
      </nav>

      <div className="flex flex-col justify-center items-center cursor-pointer md:hidden z-50 text-gray-800" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </div>
    </header>
  );
}