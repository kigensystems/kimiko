'use client';

import { usePhantomContext } from '@/context/PhantomProvider';
import { useState } from 'react';

export default function PhantomButton() {
  const { isPhantomInstalled, isConnected, isLoading, publicKey, connect, disconnect } = usePhantomContext();
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    try {
      setError(null);
      await connect();
    } catch (err) {
      setError('Failed to connect wallet');
      console.error(err);
    }
  };

  const handleDisconnect = async () => {
    try {
      setError(null);
      await disconnect();
    } catch (err) {
      setError('Failed to disconnect wallet');
      console.error(err);
    }
  };

  const baseClasses = `
    relative group px-6 py-2 rounded-lg font-semibold uppercase tracking-[0.2em] text-sm
    transition-all duration-300 overflow-hidden
    backdrop-blur-sm bg-white/[0.02]
    min-w-[180px] md:min-w-[200px]
    whitespace-nowrap
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  if (!isPhantomInstalled) {
    return (
      <button
        onClick={() => window.open('https://phantom.app/', '_blank')}
        className={`${baseClasses} text-[#F5F2ED] hover:text-[#FFC300]`}
      >
        <span className="relative z-10">Install Phantom</span>
      </button>
    );
  }

  if (isConnected && publicKey) {
    return (
      <button
        onClick={handleDisconnect}
        disabled={isLoading}
        className={`${baseClasses} text-[#FF4E2D] hover:text-[#FFC300]`}
      >
        <span className="relative z-10 flex items-center justify-center">
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-[#FF4E2D] border-t-transparent rounded-full animate-spin mr-2" />
          ) : null}
          {publicKey.slice(0, 4)}...{publicKey.slice(-4)}
        </span>
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={handleConnect}
        disabled={isLoading}
        className={`${baseClasses} text-[#F5F2ED] hover:text-[#FFC300]`}
      >
        <span className="relative z-10 flex items-center justify-center">
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-[#F5F2ED] border-t-transparent rounded-full animate-spin mr-2" />
          ) : null}
          Connect Wallet
        </span>
      </button>
      {error && (
        <div className="absolute top-full left-0 right-0 mt-2 text-center text-sm text-[#FF4E2D]">
          {error}
        </div>
      )}
    </div>
  );
}