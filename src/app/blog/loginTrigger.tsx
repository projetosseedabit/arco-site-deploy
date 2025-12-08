"use client";
import { useState } from "react";
import { Shield } from "lucide-react";
import LoginModal from "./loginModal";

export default function LoginTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-[#2A8080] text-white px-4 py-2 rounded-full text-xs font-bold shadow-sm hover:shadow-lg transition-all"
      >
        <Shield size={12} />
        Admin Arco
      </button>

      {isOpen && <LoginModal onClose={() => setIsOpen(false)} />}
    </>
  );
}