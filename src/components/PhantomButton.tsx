'use client';

import { usePhantom } from '@/hooks/usePhantom';

export default function PhantomButton() {
  const { isPhantomInstalled, isConnected, publicKey, connect, disconnect } = usePhantom();

  if (!isPhantomInstalled) {
    return (
      <button
        onClick={() => window.open('https://phantom.app/', '_blank')}
        className="px-4 py-2 font-bold text-white bg-[#AB9FF2] hover:bg-[#9B8CE8] rounded-lg transition-colors"
      >
        Install Phantom
      </button>
    );
  }

  if (isConnected && publicKey) {
    return (
      <button
        onClick={disconnect}
        className="px-4 py-2 font-bold text-white bg-[#FF4E2D] hover:bg-[#E63E1D] rounded-lg transition-colors"
      >
        Disconnect {publicKey.slice(0, 4)}...{publicKey.slice(-4)}
      </button>
    );
  }

  return (
    <button
      onClick={connect}
      className="px-4 py-2 font-bold text-white bg-[#AB9FF2] hover:bg-[#9B8CE8] rounded-lg transition-colors"
    >
      Connect Phantom
    </button>
  );
}