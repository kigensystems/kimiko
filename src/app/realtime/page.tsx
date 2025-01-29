'use client';

import PumpPortal from '@/components/PumpPortal';

export default function RealtimePage() {
  return (
    <div className="min-h-screen bg-[#1C1B20]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-['Orbitron'] text-[#FFC300] font-bold mb-12
          drop-shadow-[0_2px_10px_rgba(255,195,0,0.3)]">
          Real-time Data Feed
        </h1>
        <div className="max-w-4xl mx-auto">
          <PumpPortal />
        </div>
      </div>
    </div>
  );
}