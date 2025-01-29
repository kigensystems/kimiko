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

const API_URL = '/.netlify/functions/session';

export const usePhantom = () => {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isPhantomInstalled, setIsPhantomInstalled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if Phantom is installed and verify session
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
        try {
          // Verify session exists
          const response = await fetch(`${API_URL}?publicKey=${key}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });

          if (response.ok) {
            setPublicKey(key);
            setIsConnected(true);
          } else {
            // No active session, disconnect
            await window.solana.disconnect();
            setPublicKey(null);
            setIsConnected(false);
          }
        } catch (error) {
          console.error('Error verifying session:', error);
          setPublicKey(null);
          setIsConnected(false);
        }
      }
      
      setIsLoading(false);
    };

    checkConnection();
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
      throw error;
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
      throw error;
    }
  };

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
      await storeSession(key);
      setPublicKey(key);
      setIsConnected(true);
    } catch (error) {
      console.error('Error connecting to Phantom:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Disconnect from Phantom wallet
  const disconnect = useCallback(async () => {
    try {
      setIsLoading(true);

      if (window.solana && publicKey) {
        await removeSession(publicKey);
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
  }, [publicKey]);

  return {
    isPhantomInstalled,
    isConnected,
    isLoading,
    publicKey,
    connect,
    disconnect,
  };
};