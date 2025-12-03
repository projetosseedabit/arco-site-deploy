import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  //MUDAR ESSA BOMBA NÃO ESQUECE
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),

  title: {
    default: "Arco Consultoria",
    template: "%s | Arco Consultoria"
  },
  description: "Empresa Júnior de Arquitetura e Engenharia da UFPE",
  openGraph: {
    title: "Arco Consultoria",
    description: "Transformamos ideias em realidade. Consultoria de excelência em Engenharia e Arquitetura.",
    url: "https://www.arcoconsultoria.com",
    siteName: "Arco Consultoria",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // Recomendação: crie uma imagem 1200x630px e salve em /public
        width: 1200,
        height: 630,
        alt: "Arco Consultoria - UFPE",
      },
    ],
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden w-full`}
      suppressHydrationWarning={true}>
       <Header />
        <main>
          {children}
        </main>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}