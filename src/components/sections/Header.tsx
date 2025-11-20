"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const headerClass = isScrolled || menuOpen
    ? "bg-white text-[#333]" 
    : "bg-white/5 text-[#333]";

  return (
    <header
      className={`w-full flex top-0 fixed z-50 transition-all duration-300 ease-in-out items-center justify-between px-8 md:px-20 py-4 ${headerClass}`}
    >
      {/* 1. Logo */}
      <div className="logo z-50">
        <Image
          src="/logoArco.svg"
          alt="Logo Arco"
          width={120}
          height={40}
          className="h-8 w-auto"
        />
      </div>

      {/* 2. Menu Desktop + Mobile */}
      <nav
        className={`flex flex-col md:flex-row items-end md:items-center md:gap-8 gap-4 md:static absolute top-16 left-0 w-full md:w-auto bg-[#f2f2f2] md:bg-transparent px-8 md:px-0 py-4 md:py-0 transition-all duration-300 ease-in-out ${
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto shadow-md md:shadow-none"
            : "opacity-0 -translate-y-4 pointer-events-none md:opacity-100 md:translate-y-0 md:pointer-events-auto"
        }`}
      >
        {/* LISTA DE LINKS (Restaurada para o estilo original: text-[#333]) */}
        <ul className="flex flex-col md:flex-row list-none gap-4 md:gap-8 text-[#333] font-medium">
          <li>
            <Link
              href="#"
              className="hover:text-[#1d7a7a] whitespace-nowrap"
              onClick={() => setMenuOpen(false)}
            >
              Início
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="hover:text-[#1d7a7a] whitespace-nowrap"
              onClick={() => setMenuOpen(false)}
            >
              Sobre nós
            </Link>
          </li>
          <li>
            <Link
              href="#servicos"
              className="hover:text-[#1d7a7a] whitespace-nowrap"
              onClick={() => setMenuOpen(false)}
            >
              Serviços
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="hover:text-[#1d7a7a] whitespace-nowrap"
              onClick={() => setMenuOpen(false)}
            >
              Portfólio
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="hover:text-[#1d7a7a] whitespace-nowrap"
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </Link>
          </li>
        </ul>

        {/* BOTÃO (Restaurado: rounded-lg, bg-[#28b9b4], SEM SOMBRA) */}
        <Link
          href="#"
          onClick={() => setMenuOpen(false)}
          className="bg-[#28b9b4] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#22a19b] hover:scale-105 transition whitespace-nowrap"
        >
          Fale com a gente
        </Link>
      </nav>

      {/* 3. Botão Menu Hambúrguer (Mobile Only) - Com correção dos ícones */}
      <div
        className="flex flex-col justify-center items-center cursor-pointer md:hidden z-50 text-[#333]"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <X size={28} />
        ) : (
          <Menu size={28} />
        )}
      </div>
    </header>
  );
}