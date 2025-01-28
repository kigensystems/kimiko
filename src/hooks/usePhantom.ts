'use client';

import { useCallback, useEffect, useState } from 'react';

export interface PhantomWindow extends Window {
  solana?: {
    connect(): Promise<{ publicKey: { toString(): string } }>;
    disconnect(): Promise<void>;
    isPhantom?: boolean;
    on: (event: string, callback: () => void) => void;
    off: (event: string, callback: () => void) => void;
  };
}

declare const window: PhantomWindow;

const API_URL = '/.netlify/functions/session';

export const usePhantom = () => {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isPhantomInstalled, setIsPhantomInstalled] = useState(false);

  // Check if Phantom is installed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsPhantomInstalled(!!window.solana?.isPhantom);
    }
  }, []);

  // Store wallet session
  const storeSession = async (key: string) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicKey: key }),
      });

      if (!response.ok) {
        throw new Error('Failed to store session');
      }
    } catch (error) {
      console.error('Error storing session:', error);
    }
  };

  // Remove wallet session
  const removeSession = async (key: string) => {
    try {
      const response = await fetch(API_URL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicKey: key }),
      });

      if (!response.ok) {
        throw new Error('Failed to remove session');
      }
    } catch (error) {
      console.error('Error removing session:', error);
    }
  };

  // Connect to Phantom wallet
  const connect = useCallback(async () => {
    try {
      if (!window.solana) {
        window.open('https://phantom.app/', '_blank');
        return;
      }

      const response = await window.solana.connect();
      const key = response.publicKey.toString();
      setPublicKey(key);
      setIsConnected(true);
      await storeSession(key);
    } catch (error) {
      console.error('Error connecting to Phantom:', error);
    }
  }, []);

  // Disconnect from Phantom wallet
  const disconnect = useCallback(async () => {
    try {
      if (window.solana && publicKey) {
        await removeSession(publicKey);
        await window.solana.disconnect();
        setPublicKey(null);
        setIsConnected(false);
      }
    } catch (error) {
      console.error('Error disconnecting from Phantom:', error);
    }
  }, [publicKey]);

  return {
    isPhantomInstalled,
    isConnected,
    publicKey,
    connect,
    disconnect,
  };
};