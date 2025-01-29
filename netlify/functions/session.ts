import { Handler, HandlerEvent } from '@netlify/functions';
import { getStore } from '@netlify/blobs';

interface SessionData {
  publicKey: string;
  createdAt: string;
  isActive: boolean;
}

// Store name must be alphanumeric and dashes only
const STORE_NAME = 'wallet-sessions';

const handler: Handler = async (event: HandlerEvent) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers
    };
  }

  // Initialize the sessions store with error handling
  let sessions;
  try {
    sessions = getStore({
      name: STORE_NAME,
      siteID: process.env.SITE_ID, // Netlify automatically provides this
    });

    // Test store access
    await sessions.list();
  } catch (initError) {
    console.error('Blob store initialization error:', {
      error: initError instanceof Error ? initError.message : 'Unknown error',
      siteID: process.env.SITE_ID ? 'Present' : 'Missing',
      context: 'Initial store setup'
    });
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: 'Failed to initialize session store',
        error: initError instanceof Error ? initError.message : 'Unknown error'
      })
    };
  }

  try {
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
        console.log('Attempting to retrieve session for:', publicKey);
        const session = await sessions.get(publicKey, { type: 'json' }) as SessionData | null;
        console.log('Session retrieval result:', session ? 'Found' : 'Not found');
        
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
        console.error('Session retrieval error:', {
          error: error instanceof Error ? error.message : 'Unknown error',
          publicKey,
          context: 'GET request'
        });
        
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            message: 'Error verifying session',
            error: error instanceof Error ? error.message : 'Unknown error'
          })
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
      if (!publicKey) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ message: 'Invalid public key' })
        };
      }

      try {
        console.log('Attempting to delete session for:', publicKey);
        await sessions.delete(publicKey);
        console.log('Session deleted successfully');
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ message: 'Session deleted' })
        };
      } catch (error) {
        console.error('Session deletion error:', {
          error: error instanceof Error ? error.message : 'Unknown error',
          publicKey,
          context: 'DELETE request'
        });
        
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            message: 'Error deleting session',
            error: error instanceof Error ? error.message : 'Unknown error'
          })
        };
      }
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
        console.log('Attempting to store session for:', publicKey);
        const sessionData: SessionData = {
          publicKey,
          createdAt: new Date().toISOString(),
          isActive: true
        };

        await sessions.setJSON(publicKey, sessionData);
        console.log('Session stored successfully');

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ message: 'Session stored', publicKey })
        };
      } catch (error) {
        console.error('Session storage error:', {
          error: error instanceof Error ? error.message : 'Unknown error',
          publicKey,
          context: 'POST request'
        });
        
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            message: 'Error storing session',
            error: error instanceof Error ? error.message : 'Unknown error'
          })
        };
      }
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  } catch (error) {
    console.error('Unexpected error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      context: 'Main handler'
    });
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        message: 'Unexpected error occurred',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};

export { handler };