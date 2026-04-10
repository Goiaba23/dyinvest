import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { TopNav } from "@/components/layout/top-nav";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-body"
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-headline"
});

export const metadata: Metadata = {
  title: "DYInvest Terminal | Intelligence Hub",
  description: "Plataforma de investimentos com IA para investidores brasileiros. Análises, probabilidades e notícias em linguagem simples.",
  keywords: ["investimento", "IA", "bolsa", "ações", "criptomoeda", "ouro", "dólar", "DYInvest"],
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} min-h-screen bg-terminal font-body text-on-surface antialiased`}>
        <TopNav>
          {children}
        </TopNav>
      </body>
    </html>
  );
}