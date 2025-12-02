"use client";

import React, { useState } from "react";
import { Mail, User, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ContactSection = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    toast.sucess("Mensagem enviada com sucesso!");
  };

  return (
    <section id="contato" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-[#3DBEBE]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block">
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm border border-primary/20">
              CONTATO
            </span>
          </div>
          <h2 className="mt-6 text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">
            Vamos construir algo <span className="text-primary">incrível juntos?</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Tem um projeto em mente? Preencha o formulário abaixo e nossa equipe entrará em contato em breve.
          </p>
        </div>

        <div className="w-full max-w-2xl mx-auto bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 relative">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Nome</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Seu nome"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Assunto</label>
              <div className="relative">
                <select className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-gray-700 appearance-none cursor-pointer">
                  <option value="" disabled selected>Selecione um assunto</option>
                  <option value="orcamento">Orçamento de Projeto</option>
                  <option value="duvida">Dúvida Técnica</option>
                  <option value="parceria">Parceria</option>
                  <option value="outro">Outro</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Mensagem</label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 text-gray-400" size={20} />
                <textarea
                  rows={4}
                  placeholder="Conte um pouco sobre o seu projeto..."
                  required
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-gray-700 placeholder-gray-400 resize-none"
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#2A8080] to-[#3DBEBE] hover:shadow-lg hover:shadow-[#3DBEBE]/30 text-white font-bold rounded-xl py-6 transition-all duration-300"
            >
              {isLoading ? "Enviando..." : (
                <span className="flex items-center gap-2">
                  Enviar Mensagem <Send size={18} />
                </span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
