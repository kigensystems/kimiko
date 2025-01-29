'use client';

import { usePhantomContext } from '@/context/PhantomProvider';
import { useTokens } from '@/hooks/useTokens';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { isConnected, publicKey } = usePhantomContext();
  const { tokens, isLoading, error } = useTokens(publicKey);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) return null;

  if (!isConnected || !publicKey) {
    return (
      <div className="min-h-screen bg-[#1C1B20] flex items-center justify-center">
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
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}