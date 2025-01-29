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

  useEffect(() => {
    if (mounted && !isConnected) {
      router.replace('/');
    }
  }, [mounted, isConnected, router]);

  if (!mounted || !isConnected || !publicKey) {
    return null;
  }

  return (
    <div className="min-h-screen pt-32 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Wallet Info Card */}
        <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-2xl p-12 shadow-xl mb-8">
          <h1 className="text-4xl font-bold tracking-tight font-['Orbitron'] text-[#F5F2ED] mb-6
            drop-shadow-[0_2px_10px_rgba(255,78,45,0.3)]">
            Welcome
          </h1>
          <p className="text-xl text-[#F5F2ED]/80">
            Connected Wallet: <span className="text-[#FFC300]">{publicKey}</span>
          </p>
        </div>

        {/* Tokens Section */}
        <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-2xl p-12 shadow-xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold tracking-tight font-['Orbitron'] text-[#F5F2ED]
              drop-shadow-[0_2px_10px_rgba(255,78,45,0.3)]">
              Token Holdings
            </h2>
            {isLoading && (
              <div className="w-6 h-6 border-2 border-[#FFC300] border-t-transparent rounded-full animate-spin" />
            )}
          </div>

          {error ? (
            <div className="backdrop-blur-sm bg-[#FF4E2D]/10 border border-[#FF4E2D]/20 rounded-xl p-6">
              <p className="text-[#FF4E2D] text-center">{error}</p>
            </div>
          ) : tokens.length === 0 && !isLoading ? (
            <div className="backdrop-blur-sm bg-white/[0.01] border border-white/5 rounded-xl p-6">
              <p className="text-[#F5F2ED]/60 text-center">No tokens found in this wallet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tokens.map((token) => (
                <div
                  key={token.mint}
                  className="backdrop-blur-sm bg-white/[0.01] border border-white/5 rounded-xl p-6
                    transform hover:scale-[1.02] transition-transform duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-[#F5F2ED]/60 text-sm truncate flex-1 mr-4">
                      {token.mint}
                    </p>
                    <p className="text-[#F5F2ED]/40 text-xs">
                      {token.decimals} decimals
                    </p>
                  </div>
                  <p className="text-[#FFC300] text-xl font-semibold">
                    {token.uiAmount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}