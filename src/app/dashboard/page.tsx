'use client';

import { usePhantomContext } from '@/context/PhantomProvider';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { isConnected, publicKey } = usePhantomContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!isConnected || !publicKey) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-96px)]">
        <div className="max-w-md mx-auto p-8 text-center rounded-2xl backdrop-blur-sm bg-white/[0.02] border border-white/10">
          <h2 className="text-2xl font-semibold text-[#FFC300] mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-[#F5F2ED]/60">
            Please connect your Phantom wallet to access your dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-[#FFC300] mb-6">Dashboard</h1>
      <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl text-[#F5F2ED] mb-4">Wallet Connected</h2>
        <p className="text-[#F5F2ED]/60 break-all">
          Public Key: {publicKey}
        </p>
      </div>
    </div>
  );
}