"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useCallback } from "react";

const services = [
  { color: "bg-custom-pink", label: "Design Gráfico & UI" },
  { color: "bg-custom-orange", label: "Arquitetura & Interiores" },
  { color: "bg-custom-teal", label: "Projetos de Engenharia" },
  { color: "bg-[#A9C229]", label: "Consultoria Técnica" }
];

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com" },
  { icon: Linkedin, href: "https://linkedin.com" }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }, []);

  return (
    <footer className="bg-[#1a202c] text-white pt-20 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="brightness-0 invert opacity-90">
              <Image src="/logoArco.svg" alt="Arco Consultoria" width={140} height={50} />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empresa Júnior de Arquitetura e Engenharia da UFPE. Transformando conhecimento em soluções de impacto para o mercado.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2A8080] transition-colors"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-[#3DBEBE]">Navegação</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><button onClick={() => scrollToSection("inicio")} className="hover:text-white hover:translate-x-1 transition-all">Início</button></li>
              <li><button onClick={() => scrollToSection("sobre-nos")} className="hover:text-white hover:translate-x-1 transition-all">Sobre Nós</button></li>
              <li><button onClick={() => scrollToSection("servicos")} className="hover:text-white hover:translate-x-1 transition-all">Serviços</button></li>
              <li><button onClick={() => scrollToSection("cases")} className="hover:text-white hover:translate-x-1 transition-all">Portfólio</button></li>
              <li><Link href="/blog" className="hover:text-white hover:translate-x-1 transition-all block">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-[#3DBEBE]">Serviços</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              {services.map(({ color, label }) => (
                <li key={label} className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${color}`}></span>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-[#3DBEBE]">Fale Conosco</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#3DBEBE] shrink-0 mt-0.5" />
                <span>Centro de Tecnologia e Geociências - UFPE<br/>Av. da Arquitetura, s/n<br/>Cidade Universitária, Recife - PE</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#3DBEBE] shrink-0" />
                <a href="mailto:contato@arcoconsultoria.com" className="hover:text-white transition-colors">comercial@arcoconsultoria.org</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#3DBEBE] shrink-0" />
                <a href="tel:+5581999999999" className="hover:text-white transition-colors">(81) 99916-3551</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {currentYear} Arco Consultoria. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
