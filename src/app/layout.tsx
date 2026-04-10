import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DYInvest - Investimentos com IA",
  description: "Plataforma de investimentos com IA para investidores brasileiros. Análises, probabilidades e notícias em linguagem simples.",
  keywords: ["investimento", "IA", "bolsa", "ações", "criptomoeda", "ouro", "dólar", "DYInvest"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} min-h-screen bg-liquid-dark text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}