import { WalletConfig } from '../types/wallet';
import { clusterApiUrl } from '@solana/web3.js';

// Default network configuration
export const DEFAULT_NETWORK = 'devnet' as const;

// Network endpoints
export const NETWORK_ENDPOINTS = {
  'mainnet-beta': clusterApiUrl('mainnet-beta'),
  'testnet': clusterApiUrl('testnet'),
  'devnet': clusterApiUrl('devnet'),
} as const;

// Supported wallet configurations
export const WALLET_CONFIG: WalletConfig = {
  network: DEFAULT_NETWORK,
  endpoint: NETWORK_ENDPOINTS[DEFAULT_NETWORK],
  supportedWallets: ['Phantom'],
};

// Connection config for better reliability
export const CONNECTION_CONFIG = {
  commitment: 'confirmed' as const,
  confirmTransactionInitialTimeout: 60000, // 1 minute
  wsEndpoint: '', // Will be auto-generated based on the endpoint
};

// Constants for wallet operations
export const WALLET_CONSTANTS = {
  AUTO_CONNECT: false, // Whether to attempt auto-connect on page load
  RECONNECT_ON_DISCONNECT: false, // Whether to attempt reconnect when disconnected
  LOCAL_STORAGE_KEY: 'walletName', // Key for storing last connected wallet name
  CONNECTION_TIMEOUT: 30000, // 30 seconds timeout for connection attempts
};

// Error messages
export const WALLET_ERRORS = {
  NOT_CONNECTED: 'Wallet not connected',
  CONNECTION_FAILED: 'Failed to connect wallet',
  NETWORK_ERROR: 'Network connection error',
  TRANSACTION_FAILED: 'Transaction failed',
  USER_REJECTED: 'User rejected the request',
  INSUFFICIENT_FUNDS: 'Insufficient funds for transaction',
} as const;

// Event names for analytics tracking
export const WALLET_EVENTS = {
  CONNECT_INITIATED: 'wallet_connect_initiated',
  CONNECT_SUCCESS: 'wallet_connect_success',
  CONNECT_ERROR: 'wallet_connect_error',
  DISCONNECT: 'wallet_disconnect',
  TRANSACTION_INITIATED: 'transaction_initiated',
  TRANSACTION_SUCCESS: 'transaction_success',
  TRANSACTION_ERROR: 'transaction_error',
} as const;