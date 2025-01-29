import { Handler, HandlerEvent } from '@netlify/functions';
import cookie from 'cookie';

interface SessionData {
  publicKey: string;
  createdAt: string;
  isActive: boolean;
}

const COOKIE_NAME = 'phantom_session';
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

const handler: Handler = async (event: HandlerEvent) => {
  const headers = {
    'Access-Control-Allow-Origin': event.headers.origin || '',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers
    };
  }

  // Handle session verification
  if (event.httpMethod === 'GET') {
    const cookies = cookie.parse(event.headers.cookie || '');
    const sessionCookie = cookies[COOKIE_NAME];
    const publicKey = event.queryStringParameters?.publicKey;

    if (!publicKey) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Missing public key parameter' })
      };
    }

    try {
      if (sessionCookie) {
        const session: SessionData = JSON.parse(sessionCookie);
        const isActive = session.publicKey === publicKey && session.isActive;

        return {
          statusCode: isActive ? 200 : 404,
          headers,
          body: JSON.stringify({
            message: isActive ? 'Session found' : 'No active session',
            publicKey: isActive ? publicKey : null
          })
        };
      }

      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          message: 'No active session',
          publicKey: null
        })
      };
    } catch (error) {
      console.error('Session verification error:', error);
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
    const cookieHeaders = {
      ...headers,
      'Set-Cookie': cookie.serialize(COOKIE_NAME, '', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        expires: new Date(0)
      })
    };

    return {
      statusCode: 200,
      headers: cookieHeaders,
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

    try {
      const { publicKey } = JSON.parse(event.body);
      
      if (!publicKey) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ message: 'Missing public key' })
        };
      }

      const sessionData: SessionData = {
        publicKey,
        createdAt: new Date().toISOString(),
        isActive: true
      };

      const cookieHeaders = {
        ...headers,
        'Set-Cookie': cookie.serialize(COOKIE_NAME, JSON.stringify(sessionData), {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          path: '/',
          maxAge: COOKIE_MAX_AGE
        })
      };

      return {
        statusCode: 200,
        headers: cookieHeaders,
        body: JSON.stringify({ message: 'Session stored', publicKey })
      };
    } catch (error) {
      console.error('Session creation error:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          message: 'Error creating session',
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
};

export { handler };