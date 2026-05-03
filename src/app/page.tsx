import type { Metadata } from "next";
import HomePageClient from "./home-client";

export const metadata: Metadata = {
  title: "DYInvest - Sua Plataforma de Investimentos com IA",
  description: "Plataforma SaaS de investimentos com IA para investidores brasileiros",
};

export default function HomePage() {
  return <HomePageClient />;
}
