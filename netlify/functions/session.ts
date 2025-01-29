import { Handler, HandlerEvent } from '@netlify/functions';
import { getStore } from '@netlify/blobs';

interface SessionData {
  publicKey: string;
  createdAt: string;
  isActive: boolean;
}

const handler: Handler = async (event: HandlerEvent) => {
  // Initialize the sessions store
  const sessions = getStore('sessions');

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

    try {
      const session = await sessions.get(publicKey, { type: 'json' }) as SessionData | null;
      const isActive = session !== null && session.isActive;
      
      return {
        statusCode: isActive ? 200 : 404,
        headers,
        body: JSON.stringify({ 
          message: isActive ? 'Session found' : 'No active session',
          publicKey: isActive ? publicKey : null
        })
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ message: 'Error verifying session' })
      };
    }
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
      try {
        await sessions.delete(publicKey);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ message: 'Session deleted' })
        };
      } catch (error) {
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ message: 'Error deleting session' })
        };
      }
    }

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ message: 'Invalid public key' })
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

    try {
      const sessionData: SessionData = {
        publicKey,
        createdAt: new Date().toISOString(),
        isActive: true
      };

      await sessions.setJSON(publicKey, sessionData);
      console.log('Storing session for wallet:', publicKey);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'Session stored', publicKey })
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ message: 'Error storing session' })
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