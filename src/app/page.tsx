'use client';

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import KimikoLiveFeed from "@/components/KimikoLiveFeed";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <section id="feed" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <KimikoLiveFeed />
        </div>
      </section>
      <Footer />
    </main>
  );
}
