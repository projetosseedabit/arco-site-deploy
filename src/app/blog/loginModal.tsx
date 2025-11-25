"use client";

import React, { useState } from "react";
import { X, Lock, Eye, EyeOff, User } from "lucide-react";
import { loginAction } from "@/app/auth-actions";

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError("");
    
    const res = await loginAction(formData);
    
    if (res.success) {
      window.location.reload(); 
    } else {
      setError(res.message || "Credenciais inválidas");
      setIsLoading(false);
    }
  };

  return (
    // Overlay Escuro (Fundo)
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      
      {/* Container do Modal */}
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden transform transition-all scale-100 animate-in zoom-in-95 duration-200 relative">
        
        {/* Botão Fechar */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
        
        {/* Cabeçalho */}
        <div className="bg-[#E0F7F5] p-8 text-center border-b border-[#2A8080]/10">
          <div className="mx-auto bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-sm mb-4 text-[#2A8080]">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold text-[#2A8080]">Acesso Restrito</h2>
          <p className="text-sm text-gray-500 mt-1">Área exclusiva para administradores</p>
        </div>

        {/* Formulário */}
        <div className="p-8">
            <form action={handleSubmit} className="space-y-5">
              
              {/* Campo Usuário */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Usuário</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <User size={18} />
                  </div>
                  <input 
                    name="username" 
                    type="text" 
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#2A8080] focus:ring-2 focus:ring-[#2A8080]/20 transition-all text-gray-700 placeholder-gray-400" 
                    placeholder="Digite seu usuário" 
                    required 
                  />
                </div>
              </div>

              {/* Campo Senha com Toggle */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Senha</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input 
                    name="password" 
                    type={showPassword ? "text" : "password"} 
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#2A8080] focus:ring-2 focus:ring-[#2A8080]/20 transition-all text-gray-700 placeholder-gray-400" 
                    placeholder="••••••••" 
                    required 
                  />
                  {/* Botão Olhinho */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#2A8080] transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              {/* Mensagem de Erro */}
              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium border border-red-100">
                  {error}
                </div>
              )}

              {/* Botão Submit */}
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#2A8080] text-white py-3 rounded-lg font-bold hover:bg-[#1e6060] active:scale-[0.98] transition-all shadow-lg shadow-[#2A8080]/20 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  "Entrar no Sistema"
                )}
              </button>
            </form>
        </div>
      </div>
    </div>
  );
}