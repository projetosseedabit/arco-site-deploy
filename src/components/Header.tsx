"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#f2f2f2] flex items-center justify-between px-20 py-4 shadow-sm relative z-10 md:px-8">
      {/* Logo */}
      <div className="logo">
        <Image
          src="/logoArco.svg"
          alt="Logo Arco"
          width={120}
          height={40}
          className="h-10 w-auto"
        />
      </div>

      {/* Menu Desktop + Mobile */}
      <nav
        className={`${
          menuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row items-center md:gap-8 gap-4 md:static absolute top-[70px] left-0 w-full md:w-auto bg-[#f2f2f2] md:bg-transparent shadow-md md:shadow-none px-6 md:px-0 py-4 md:py-0 transition-all`}
      >
        <ul className="flex flex-col md:flex-row list-none gap-4 md:gap-8 text-[#333] font-medium">
          <li><Link href="#" className="hover:text-[#1d7a7a]">Início</Link></li>
          <li><Link href="#" className="hover:text-[#1d7a7a]">Sobre nós</Link></li>
          <li><Link href="#" className="hover:text-[#1d7a7a]">Serviços</Link></li>
          <li><Link href="#" className="hover:text-[#1d7a7a]">Portfólio</Link></li>
          <li><Link href="#" className="hover:text-[#1d7a7a]">Blog</Link></li>
        </ul>

        {/* Botão Contato */}
        <Link
          href="#"
          className="bg-[#28b9b4] text-white px-5 py-2 rounded-lg font-medium shadow-[0_2px_6px_rgba(40,185,180,0.3)] hover:bg-[#22a19b] hover:scale-105 hover:shadow-[0_4px_10px_rgba(34,161,155,0.4)] transition"
        >
          Fale com a gente
        </Link>
      </nav>

      {/* Botão Menu Mobile */}
      <div
        className="flex flex-col justify-between w-6 h-4 cursor-pointer md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span
          className={`h-[3px] w-full bg-[#333] rounded transition ${
            menuOpen ? "rotate-45 translate-y-[7px]" : ""
          }`}
        ></span>
        <span
          className={`h-[3px] w-full bg-[#333] rounded transition ${
            menuOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`h-[3px] w-full bg-[#333] rounded transition ${
            menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
          }`}
        ></span>
      </div>
    </header>
  );
}
