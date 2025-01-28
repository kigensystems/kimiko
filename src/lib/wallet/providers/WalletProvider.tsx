'use client';

import { FC, ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WALLET_CONFIG, CONNECTION_CONFIG } from '../constants/config';

// Import wallet adapter CSS
require('@solana/wallet-adapter-react-ui/styles.css');

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: FC<WalletProviderProps> = ({ children }) => {
  // Initialize wallet adapters
  const wallets = useMemo(() => {
    const adapters = [];
    
    if (WALLET_CONFIG.supportedWallets.includes('Phantom')) {
      adapters.push(new PhantomWalletAdapter());
    }
    
    return adapters;
  }, []);

  return (
    <ConnectionProvider 
      endpoint={WALLET_CONFIG.endpoint}
      config={CONNECTION_CONFIG}
    >
      <SolanaWalletProvider 
        wallets={wallets}
        autoConnect={false}
      >
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
};

// Re-export wallet hooks and types for convenience
export * from '../hooks/useWallet';
export * from '../types/wallet';