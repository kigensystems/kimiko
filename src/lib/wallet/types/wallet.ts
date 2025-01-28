import { PublicKey } from '@solana/web3.js';

export interface WalletState {
  isConnected: boolean;
  isConnecting: boolean;
  hasError: boolean;
  errorMessage?: string;
  publicKey: PublicKey | null;
  balance?: number;
}

export interface WalletActions {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  refreshBalance: () => Promise<void>;
}

export interface WalletContextValue extends WalletState, WalletActions {}

export type SupportedWallets = 'Phantom';

export interface WalletConfig {
  network: 'mainnet-beta' | 'testnet' | 'devnet';
  endpoint: string;
  supportedWallets: SupportedWallets[];
}

export type WalletError = {
  code: string;
  message: string;
  details?: unknown;
};

export interface TransactionResult {
  signature: string;
  success: boolean;
  error?: WalletError;
}

// Event types for wallet state changes
export type WalletEventType = 
  | 'connect'
  | 'disconnect'
  | 'error'
  | 'balanceChange';

export interface WalletEvent {
  type: WalletEventType;
  payload?: unknown;
  error?: WalletError;
}