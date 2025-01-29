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
          const response = await fetch(`${API_URL}?publicKey=${encodeURIComponent(key)}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to verify session');
          }

          const data = await response.json();
          if (data.publicKey) {
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
          // Attempt to disconnect on error
          try {
            await window.solana.disconnect();
          } catch (disconnectError) {
            console.error('Error disconnecting after session verification failed:', disconnectError);
          }
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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to store session');
      }

      const data = await response.json();
      if (!data.publicKey) {
        throw new Error('Invalid response from session storage');
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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to remove session');
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
      
      // Attempt to store session
      try {
        await storeSession(key);
        setPublicKey(key);
        setIsConnected(true);
      } catch (sessionError) {
        // If session storage fails, disconnect the wallet
        console.error('Session storage failed:', sessionError);
        await window.solana.disconnect();
        throw sessionError;
      }
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

      if (window.solana && publicKey) {
        // Attempt to remove session first
        try {
          await removeSession(publicKey);
        } catch (sessionError) {
          console.error('Error removing session during disconnect:', sessionError);
          // Continue with disconnect even if session removal fails
        }

        await window.solana.disconnect();
        setPublicKey(null);
        setIsConnected(false);
      }
    } catch (error) {
      console.error('Error disconnecting from Phantom:', error);
      // Reset state even if there's an error
      setPublicKey(null);
      setIsConnected(false);
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