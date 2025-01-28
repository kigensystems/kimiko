'use client';

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1C1B20] flex items-center justify-center">
        <div className="text-[#F5F2ED] text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#1C1B20]">
      <Navbar />
      <Hero />
      <Features />
    </main>
  );
}
