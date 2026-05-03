import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header";
import MarketTicker from "@/components/market-ticker";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "DYInvest - Plataforma de Investimentos com IA",
  description: "Análise inteligente de investimentos com IA. Ações, FIIs, criptomoedas e muito mais.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-white text-gray-900 antialiased">
        <div className="min-h-screen flex flex-col">
          <Header />
          <MarketTicker />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
