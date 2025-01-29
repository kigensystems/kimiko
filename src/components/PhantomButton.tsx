'use client';

import { usePhantom } from '@/hooks/usePhantom';

export default function PhantomButton() {
  const { isPhantomInstalled, isConnected, publicKey, connect, disconnect } = usePhantom();

  const baseClasses = `
    relative group px-6 py-2 rounded-lg font-semibold uppercase tracking-[0.2em] text-sm
    transition-all duration-300 overflow-hidden
  `;

  const glassClasses = `
    before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#FF4E2D]/10 before:to-[#FFC300]/10
    before:backdrop-blur-sm before:transition-all before:duration-300
    hover:before:from-[#FF4E2D]/20 hover:before:to-[#FFC300]/20
  `;

  const gradientBorder = `
    after:absolute after:inset-0 after:p-[1px] after:-z-10
    after:bg-gradient-to-r after:from-[#FF4E2D] after:to-[#FFC300]
    after:rounded-lg after:transition-all after:duration-300
    after:opacity-50 hover:after:opacity-100
  `;

  if (!isPhantomInstalled) {
    return (
      <button
        onClick={() => window.open('https://phantom.app/', '_blank')}
        className={`
          ${baseClasses}
          ${glassClasses}
          ${gradientBorder}
          text-[#F5F2ED] hover:text-[#FFC300]
        `}
      >
        <span className="relative z-10">Install Phantom</span>
      </button>
    );
  }

  if (isConnected && publicKey) {
    return (
      <button
        onClick={disconnect}
        className={`
          ${baseClasses}
          ${glassClasses}
          ${gradientBorder}
          text-[#FF4E2D] hover:text-[#FFC300]
        `}
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
      className={`
        ${baseClasses}
        ${glassClasses}
        ${gradientBorder}
        text-[#F5F2ED] hover:text-[#FFC300]
      `}
    >
      <span className="relative z-10">Connect</span>
    </button>
  );
}