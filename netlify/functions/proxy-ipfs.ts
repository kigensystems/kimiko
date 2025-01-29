import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';

const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }

  const { hash } = event.queryStringParameters || {};
  if (!hash) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ message: 'IPFS hash is required' })
    };
  }

  try {
    console.log('Fetching from IPFS:', hash);
    const response = await fetch(`https://ipfs.io/ipfs/${hash}`);
    
    if (!response.ok) {
      throw new Error(`IPFS request failed with status ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    console.log('Content type:', contentType);

    // For images, return base64 encoded data
    if (contentType?.startsWith('image/')) {
      const buffer = await response.buffer();
      const base64 = buffer.toString('base64');
      return {
        statusCode: 200,
        headers: {
          ...headers,
          'Content-Type': contentType
        },
        body: base64,
        isBase64Encoded: true
      };
    }

    // For JSON and other text content
    const text = await response.text();
    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': contentType || 'application/json'
      },
      body: text
    };
  } catch (error) {
    console.error('Error fetching from IPFS:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        message: 'Failed to fetch from IPFS',
        error: error instanceof Error ? error.message : String(error)
      })
    };
  }
};

export { handler };