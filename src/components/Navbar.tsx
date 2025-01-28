'use client';

import { useWallet } from '@/lib/wallet/providers/WalletProvider';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Navbar() {
  const { isConnected } = useWallet();

  return (
    <nav className="fixed top-0 w-full bg-[#1C1B20]/80 backdrop-blur-sm border-b border-[#FF4E2D]/20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold font-['Orbitron'] text-[#FF4E2D]">
              Kimiko
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-[#F5F2ED] hover:text-[#FFC300] transition-colors">
              Features
            </a>
            <a href="#" className="text-[#F5F2ED] hover:text-[#FFC300] transition-colors">
              About
            </a>
            <a href="#" className="text-[#F5F2ED] hover:text-[#FFC300] transition-colors">
              Contact
            </a>
            <div className="wallet-adapter-button-trigger">
              <WalletMultiButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}