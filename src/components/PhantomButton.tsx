'use client';

import { usePhantom } from '@/hooks/usePhantom';

export default function PhantomButton() {
  const { isPhantomInstalled, isConnected, publicKey, connect, disconnect } = usePhantom();

  const baseClasses = `
    relative group px-6 py-2 rounded-lg font-semibold uppercase tracking-[0.2em] text-sm
    transition-all duration-300 overflow-hidden
    backdrop-blur-sm bg-white/[0.02]
    min-w-[180px] md:min-w-[200px]
    whitespace-nowrap
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
        onClick={disconnect}
        className={`${baseClasses} text-[#FF4E2D] hover:text-[#FFC300]`}
      >
        <span className="relative z-10">
          {publicKey.slice(0, 4)}...{publicKey.slice(-4)}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={connect}
      className={`${baseClasses} text-[#F5F2ED] hover:text-[#FFC300]`}
    >
      <span className="relative z-10">Connect Wallet</span>
    </button>
  );
}