'use client';

import { useState, useEffect, useCallback } from 'react';

interface TokenEvent {
  signature?: string;
  timestamp?: string;
  name?: string;
  symbol?: string;
  marketCapSol?: number;
  initialBuy?: number;
  solAmount?: number;
  mint?: string;
  traderPublicKey?: string;
  uri?: string;
}

export function useKimikoLiveFeed() {
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState<TokenEvent[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Poll for updates
  useEffect(() => {
    if (!isConnected) return;

    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch('/.netlify/functions/kimiko-live-feed');
        if (!response.ok) throw new Error('Failed to fetch updates');
        
        const newData = await response.json();
        if (Array.isArray(newData)) {
          setData(newData.map(event => ({
            ...event,
            timestamp: event.timestamp || new Date().toISOString()
          })));
        }
      } catch (err) {
        console.error('Error polling for updates:', err);
      }
    }, 1000); // Poll every second

    return () => {
      clearInterval(pollInterval);
    };
  }, [isConnected]);

  const connect = useCallback(async () => {
    try {
      const response = await fetch('/.netlify/functions/kimiko-live-feed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'connect' }),
      });

      if (!response.ok) {
        throw new Error('Failed to connect to Kimiko Live Feed');
      }

      const { currentData } = await response.json();
      if (Array.isArray(currentData)) {
        setData(currentData.map(event => ({
          ...event,
          timestamp: event.timestamp || new Date().toISOString()
        })));
      }
      setIsConnected(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect');
      setIsConnected(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      await fetch('/.netlify/functions/kimiko-live-feed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'disconnect' }),
      });
    } finally {
      setIsConnected(false);
      setData([]);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    isConnected,
    data,
    error,
    connect,
    disconnect
  };
}