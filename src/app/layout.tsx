import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/sidebar";
import TopBar from "@/components/layout/topbar";

export const metadata: Metadata = {
  title: "DYInvest - AI-Powered Investment Platform",
  description: "Plataforma SaaS de investimentos com IA para investidores brasileiros",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="font-sans">
        <div className="flex min-h-screen bg-[#0a0a0c]">
          <Sidebar />
          <div className="ml-[80px] flex-1 flex flex-col min-h-screen">
            <TopBar />
            <main className="flex-1 mt-16 p-6 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
