'use client';

import { useCallback, useEffect, useState } from 'react';

export interface PhantomWindow extends Window {
  solana?: {
    connect(): Promise<{ publicKey: { toString(): string } }>;
    disconnect(): Promise<void>;
    isPhantom?: boolean;
    publicKey?: { toString(): string };
    on: (event: string, callback: () => void) => void;
    off: (event: string, callback: () => void) => void;
  };
}

declare const window: PhantomWindow;

export const usePhantom = () => {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isPhantomInstalled, setIsPhantomInstalled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if Phantom is installed and connected
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window === 'undefined') {
        setIsLoading(false);
        return;
      }

      const isPhantom = !!window.solana?.isPhantom;
      setIsPhantomInstalled(isPhantom);

      if (isPhantom && window.solana?.publicKey) {
        const key = window.solana.publicKey.toString();
        setPublicKey(key);
        setIsConnected(true);
      }
      
      setIsLoading(false);
    };

    checkConnection();

    // Listen for account changes
    const handleAccountChange = () => {
      if (window.solana?.publicKey) {
        const key = window.solana.publicKey.toString();
        setPublicKey(key);
        setIsConnected(true);
      } else {
        setPublicKey(null);
        setIsConnected(false);
      }
    };

    if (window.solana) {
      window.solana.on('accountChanged', handleAccountChange);
    }

    return () => {
      if (window.solana) {
        window.solana.off('accountChanged', handleAccountChange);
      }
    };
  }, []);

  // Connect to Phantom wallet
  const connect = useCallback(async () => {
    try {
      setIsLoading(true);

      if (!window.solana) {
        window.open('https://phantom.app/', '_blank');
        return;
      }

      const response = await window.solana.connect();
      const key = response.publicKey.toString();
      setPublicKey(key);
      setIsConnected(true);
    } catch (error) {
      console.error('Error connecting to Phantom:', error);
      setPublicKey(null);
      setIsConnected(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Disconnect from Phantom wallet
  const disconnect = useCallback(async () => {
    try {
      setIsLoading(true);

      if (window.solana) {
        await window.solana.disconnect();
        setPublicKey(null);
        setIsConnected(false);
      }
    } catch (error) {
      console.error('Error disconnecting from Phantom:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isPhantomInstalled,
    isConnected,
    isLoading,
    publicKey,
    connect,
    disconnect,
  };
};