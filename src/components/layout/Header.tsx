"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation"; // Removido useRouter

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  // Removido const router = useRouter(); pois não era usado

  useEffect(() => {
    const handleScroll = () => {
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
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    setMenuOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      smoothScrollTo(targetId);
      window.history.pushState(null, "", `/#${targetId}`);
    }
  };

  const isTransparentPage = pathname === "/" || pathname.startsWith("/blog");
  
  const headerClass = isScrolled || menuOpen || !isTransparentPage
    ? "bg-white/90 backdrop-blur-md text-gray-800 shadow-md"
    : "bg-transparent text-gray-800"; 

  return (
    <header className={`w-full flex justify-center top-0 fixed z-50 transition-all duration-300 ease-in-out px-8 md:px-20 py-4 ${headerClass}`}>
      <div className="w-full max-w-screen-xl flex items-center justify-between">
        <div className="logo z-50">
          <Link href="/#inicio" onClick={(e) => handleLinkClick(e, "inicio")}>
              <Image src="/logoArco.svg" alt="Logo Arco" width={120} height={40} className="h-8 w-auto cursor-pointer" />
          </Link>
        </div>

        <nav className={`flex flex-col md:flex-row items-end md:items-center md:gap-8 gap-4 md:static absolute top-16 left-0 w-full md:w-auto bg-[#f2f2f2] md:bg-transparent px-8 md:px-0 py-8 md:py-0 transition-all duration-300 ease-in-out ${menuOpen ? "opacity-100 translate-y-0 pointer-events-auto md:shadow-none" : "opacity-0 -translate-y-4 pointer-events-none md:opacity-100 md:translate-y-0 md:pointer-events-auto"}`}>
          <ul className="flex flex-col md:flex-row list-none gap-4 md:gap-8 text-gray-800 font-medium">
            <li><Link href="/#inicio" className="hover:text-[#1d7a7a] transition-colors" onClick={(e) => handleLinkClick(e, "inicio")}>Início</Link></li>
            <li><Link href="/#sobre-nos" className="hover:text-[#1d7a7a] transition-colors" onClick={(e) => handleLinkClick(e, "sobre-nos")}>Sobre nós</Link></li>
            <li><Link href="/#servicos" className="hover:text-[#1d7a7a] transition-colors" onClick={(e) => handleLinkClick(e, "servicos")}>Serviços</Link></li>
            <li><Link href="/#portfolio" className="hover:text-[#1d7a7a] transition-colors" onClick={(e) => handleLinkClick(e, "cases")}>Portfólio</Link></li>
            <li><Link href="/blog" className="hover:text-[#1d7a7a] transition-colors" onClick={() => setMenuOpen(false)}>Blog</Link></li>
          </ul>

          <Link href="/#contato" onClick={(e) => handleLinkClick(e, "contato")} className="bg-[#28b9b4] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#22a19b] hover:scale-105 transition whitespace-nowrap shadow-none">
            Fale com a gente
          </Link>
        </nav>

        <div className="flex flex-col justify-center items-center cursor-pointer md:hidden z-50 text-gray-800" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>
    </header>
  );
}