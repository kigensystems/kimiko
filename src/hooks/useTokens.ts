'use client';

import { useState, useEffect } from 'react';

interface TokenBalance {
  mint: string;
  amount: number;
  decimals: number;
  uiAmount: number;
}

export const useTokens = (publicKeyString: string | null) => {
  const [tokens, setTokens] = useState<TokenBalance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      if (!publicKeyString) {
        setTokens([]);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/.netlify/functions/tokens', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ publicKey: publicKeyString }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch token balances');
        }

        const data = await response.json();
        setTokens(data.tokens);
        setError(null);
      } catch (err) {
        console.error('Error fetching token balances:', err);
        setError('Failed to fetch token balances');
        setTokens([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokens();
  }, [publicKeyString]);

  return { tokens, isLoading, error };
};