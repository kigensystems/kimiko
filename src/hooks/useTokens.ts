'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface TokenBalance {
  mint: string;
  amount: number;
  decimals: number;
  uiAmount: number;
}

const RPC_URL = 'https://solana-mainnet.g.alchemy.com/v2/M1URy27aTjYUGsOqZ-3MtAjBwmhfq5An';

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
        let allTokens: TokenBalance[] = [];
        let hasMore = true;
        let pageKey = null;

        while (hasMore) {
          const request = {
            method: 'alchemy_getTokenBalances',
            params: [
              publicKeyString,
              pageKey ? { pageKey } : {}
            ],
            id: 1,
            jsonrpc: '2.0'
          };

          const response = await axios.post(RPC_URL, request);
          const result = response.data.result;

          const tokenBalances = result.value
            .map((token: any) => ({
              mint: token.tokenAccount,
              amount: Number(token.amount),
              decimals: token.decimals || 0,
              uiAmount: Number(token.amount) / Math.pow(10, token.decimals || 0),
            }))
            .filter((token: TokenBalance) => token.uiAmount > 0);

          allTokens = [...allTokens, ...tokenBalances];

          if (result.pageKey) {
            pageKey = result.pageKey;
          } else {
            hasMore = false;
          }
        }

        // Sort by balance
        allTokens.sort((a, b) => b.uiAmount - a.uiAmount);
        setTokens(allTokens);
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