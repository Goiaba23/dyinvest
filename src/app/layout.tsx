import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DYInvest - Your AI Investment Partner",
  description: "Understand the market. Invest with confidence. Powered by AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}