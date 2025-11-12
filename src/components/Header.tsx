"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    
    <header className={`w-full flex gap-x-2 top-0 fixed z-50 transition-all duration-300 ease-in-out items-center justify-between px-8 md:px-20 py-4
    ${isScrolled 
            ? 'bg-white text-gray-800 shadow-lg' 
            : 'bg-white/5 text-gray-800'          
        }`}>
    
      {/* Logo */}
      <div className="logo">
        <Image
          src="/logoArco.svg"
          alt="Logo Arco"
          width={120}
          height={40}
          className="h-8 w-auto"
        />
      </div>

      {/* Menu Desktop + Menu Mobile */}
      <nav
        className={`
          flex md:flex flex-col md:flex-row items-end md:items-center md:gap-8 gap-4 
          md:static absolute top-16 left-0 w-full md:w-auto 
          bg-[#f2f2f2]/100 md:bg-transparent 
          shadow-md md:shadow-none 
          px-8 md:px-0 py-4 md:py-0 
          transition-all duration-300 ease-in-out
          ${menuOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
          }
          md:opacity-100 md:translate-y-0 md:pointer-events-auto
        `}
      >
        <ul className="flex flex-col md:flex-row list-none gap-4 md:gap-8 text-[#333] md:text-inherit font-medium">
          <li><Link href="#" className="hover:text-[#1d7a7a] ">Início</Link></li>
          <li><Link href="#" className="hover:text-[#1d7a7a] whitespace-nowrap">Sobre nós</Link></li>
          <li><Link href="#" className="hover:text-[#1d7a7a] whitespace-nowrap">Serviços</Link></li>
          <li><Link href="#" className="hover:text-[#1d7a7a] whitespace-nowrap">Portfólio</Link></li>
          <li><Link href="#" className="hover:text-[#1d7a7a] whitespace-nowrap">Blog</Link></li>
          <li> <Link href="#" className="bg-[#28b9b4] text-white whitespace-nowrap px-5 py-2 rounded-lg font-medium shadow-[0_2px_6px_rgba(40,185,180,0.3)] hover:bg-[#22a19b] hover:scale-105 hover:shadow-[0_4px_10px_rgba(34,161,155,0.4)] transition"
            >
            Fale com a gente
            </Link> </li>
          </ul>
      </nav>

      {/* Menu Sanduíche Mobile */}
      <div
        className="flex flex-col justify-between w-6 h-4 cursor-pointer md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span
          className={`h-[3px] w-full rounded transition ${
            menuOpen ? 'bg-[#333]' : isScrolled ? 'bg-gray-800' : 'bg-gray-800'
          } ${
            menuOpen ? "rotate-45 translate-y-[7px]" : ""
          }`}
        ></span>
        <span
          className={`h-[3px] w-full rounded transition ${
            menuOpen ? 'bg-[#333]' : isScrolled ? 'bg-gray-800' : 'bg-gray-800'
          } ${
            menuOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`h-[3px] w-full rounded transition ${
            menuOpen ? 'bg-[#333]' : isScrolled ? 'bg-gray-800' : 'bg-gray-800'
          } ${
            menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
          }`}
        ></span>
      </div>
    </header>
  );
}