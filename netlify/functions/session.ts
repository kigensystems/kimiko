import { Handler } from '@netlify/functions';

// This function is deprecated and no longer used.
// Wallet connection state is now managed client-side through Phantom's built-in functionality.
const handler: Handler = async () => {
  return {
    statusCode: 410, // Gone
    body: JSON.stringify({ 
      message: 'This endpoint is deprecated. Wallet sessions are now managed client-side.'
    })
  };
};

export { handler };