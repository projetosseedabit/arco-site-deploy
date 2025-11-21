import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arco Consultoria", // Aproveitei para ajustar o título
  description: "Empresa Júnior de Arquitetura e Engenharia da UFPE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      {/* Correção para que não seja possível scrollar pra direita ou esquerda */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden w-full`}>
       <Header />

        <main>
          {children}
        </main>
      </body>
    </html>
  );
}