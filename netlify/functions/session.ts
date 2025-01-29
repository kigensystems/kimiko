import { Handler, HandlerEvent } from '@netlify/functions';

// In-memory session store
const sessions = new Map<string, boolean>();

const handler: Handler = async (event: HandlerEvent) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': event.headers.origin || '',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Credentials': 'true'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers
    };
  }

  // Handle session verification
  if (event.httpMethod === 'GET') {
    const publicKey = event.queryStringParameters?.publicKey;
    
    if (!publicKey) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Missing public key parameter' })
      };
    }

    const isActive = sessions.has(publicKey);
    return {
      statusCode: isActive ? 200 : 404,
      headers,
      body: JSON.stringify({ 
        message: isActive ? 'Session found' : 'No active session',
        publicKey: isActive ? publicKey : null
      })
    };
  }

  // Handle session deletion (sign out)
  if (event.httpMethod === 'DELETE') {
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Missing request body' })
      };
    }

    const { publicKey } = JSON.parse(event.body);
    if (publicKey) {
      sessions.delete(publicKey);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Session deleted' })
    };
  }

  // Handle session creation
  if (event.httpMethod === 'POST') {
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Missing request body' })
      };
    }

    const { publicKey } = JSON.parse(event.body);
    
    if (!publicKey) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Missing public key' })
      };
    }

    sessions.set(publicKey, true);
    console.log('Storing session for wallet:', publicKey);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Session stored', publicKey })
    };
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ message: 'Method not allowed' })
  };
};

export { handler };