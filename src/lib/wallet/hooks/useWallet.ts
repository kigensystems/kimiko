import { useCallback, useEffect, useState } from 'react';
import { useConnection, useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { WalletContextValue, WalletError, TransactionResult } from '../types/wallet';
import { WALLET_ERRORS, WALLET_EVENTS } from '../constants/config';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';

export function useWallet(): WalletContextValue {
  const { connection } = useConnection();
  const {
    publicKey,
    connected,
    connecting,
    disconnect: solanaDisconnect,
    select,
    wallets,
  } = useSolanaWallet();

  const [balance, setBalance] = useState<number>(0);
  const [error, setError] = useState<WalletError | null>(null);

  // Fetch balance whenever the public key changes
  useEffect(() => {
    if (publicKey) {
      refreshBalance();
    }
  }, [publicKey]);

  // Connect wallet
  const connect = useCallback(async () => {
    try {
      logWalletEvent(WALLET_EVENTS.CONNECT_INITIATED);
      if (wallets.length === 0) {
        throw new Error('No wallets available');
      }
      // Select the first available wallet if none is selected
      select(wallets[0].adapter.name);
      logWalletEvent(WALLET_EVENTS.CONNECT_SUCCESS);
    } catch (err) {
      const error = handleError(err);
      logWalletEvent(WALLET_EVENTS.CONNECT_ERROR, error);
      throw error;
    }
  }, [wallets, select]);

  // Disconnect wallet
  const disconnect = useCallback(async () => {
    try {
      await solanaDisconnect();
      logWalletEvent(WALLET_EVENTS.DISCONNECT);
    } catch (err) {
      const error = handleError(err);
      throw error;
    }
  }, [solanaDisconnect]);

  // Refresh balance
  const refreshBalance = useCallback(async () => {
    if (!publicKey || !connection) {
      setBalance(0);
      return;
    }

    try {
      const balance = await connection.getBalance(publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
      setError(null);
    } catch (err) {
      const error = handleError(err);
      setError(error);
    }
  }, [publicKey, connection]);

  // Helper function to handle errors
  const handleError = (error: unknown): WalletError => {
    console.error('Wallet error:', error);
    const walletError: WalletError = {
      code: 'UNKNOWN_ERROR',
      message: WALLET_ERRORS.NETWORK_ERROR,
    };

    if (error instanceof Error) {
      walletError.message = error.message;
      walletError.details = error;
    }

    setError(walletError);
    return walletError;
  };

  // Helper function to log wallet events
  const logWalletEvent = (eventName: string, error?: WalletError) => {
    console.log('Wallet event:', {
      event: eventName,
      timestamp: new Date().toISOString(),
      walletAddress: publicKey?.toBase58(),
      error,
    });
  };

  return {
    isConnected: connected,
    isConnecting: connecting,
    hasError: !!error,
    errorMessage: error?.message,
    publicKey: publicKey,
    balance,
    connect,
    disconnect,
    refreshBalance,
  };
}

// Export a mock wallet hook for testing
export function useMockWallet(): WalletContextValue {
  return {
    isConnected: false,
    isConnecting: false,
    hasError: false,
    errorMessage: undefined,
    publicKey: null,
    balance: 0,
    connect: async () => {},
    disconnect: async () => {},
    refreshBalance: async () => {},
  };
}