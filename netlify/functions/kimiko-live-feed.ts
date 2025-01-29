import { Handler } from '@netlify/functions';
import WebSocket from 'ws';

interface SubscribePayload {
  method: 'subscribeNewToken' | 'subscribeTokenTrade' | 'subscribeAccountTrade' | 'subscribeRaydiumLiquidity';
  keys?: string[];
}

interface TokenEvent {
  signature: string;
  mint: string;
  traderPublicKey: string;
  txType: string;
  initialBuy: number;
  solAmount: number;
  marketCapSol: number;
  name: string;
  symbol: string;
  uri: string;
  timestamp?: string;
}

let ws: WebSocket | null = null;
let messageBuffer: TokenEvent[] = [];
const MAX_BUFFER_SIZE = 6;

const connectWebSocket = () => {
  if (ws?.readyState === WebSocket.OPEN) {
    console.log('WebSocket already connected');
    return;
  }

  ws = new WebSocket('wss://pumpportal.fun/api/data');

  ws.on('open', function open() {
    if (!ws) return;

    console.log('Connected to Kimiko Live Feed WebSocket');

    // Subscribe to new token events
    const tokenPayload: SubscribePayload = {
      method: "subscribeNewToken"
    };
    ws.send(JSON.stringify(tokenPayload));
  });

  ws.on('message', function message(data) {
    try {
      const parsedData = JSON.parse(data.toString());
      // Add timestamp and format data
      const eventWithTimestamp: TokenEvent = {
        signature: parsedData.signature || '',
        mint: parsedData.mint || '',
        traderPublicKey: parsedData.traderPublicKey || '',
        txType: parsedData.txType || '',
        initialBuy: Number(parsedData.initialBuy) || 0,
        solAmount: Number(parsedData.solAmount) || 0,
        marketCapSol: Number(parsedData.marketCapSol) || 0,
        name: parsedData.name || '',
        symbol: parsedData.symbol || '',
        uri: parsedData.uri || '',
        timestamp: new Date().toISOString()
      };
      
      // Add to buffer
      messageBuffer = [eventWithTimestamp, ...messageBuffer].slice(0, MAX_BUFFER_SIZE);
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });

  ws.on('error', function error(err) {
    console.error('WebSocket error:', err);
  });

  ws.on('close', function close() {
    console.log('WebSocket connection closed');
    ws = null;
  });

  return ws;
};

const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers
    };
  }

  // Handle GET request to fetch current buffer
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(messageBuffer)
    };
  }

  if (event.httpMethod === 'POST') {
    try {
      const { action } = JSON.parse(event.body || '{}');

      switch (action) {
        case 'connect':
          connectWebSocket();
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
              message: 'WebSocket connection initiated',
              currentData: messageBuffer
            })
          };

        case 'disconnect':
          if (ws && ws.readyState === WebSocket.OPEN) {
            ws.close();
            ws = null;
          }
          messageBuffer = [];
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'WebSocket connection closed' })
          };

        default:
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ message: 'Invalid action' })
          };
      }
    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ message: 'Internal server error', error: String(error) })
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ message: 'Method not allowed' })
  };
};

export { handler };