import { Handler, HandlerEvent } from '@netlify/functions';

const handler: Handler = async (event: HandlerEvent) => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing request body' })
    };
  }

  const { publicKey } = JSON.parse(event.body);
  
  if (!publicKey) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing public key' })
    };
  }

  // Store the public key in the function context
  // This is just a basic implementation - the session will persist only while the function is warm
  console.log('Storing session for wallet:', publicKey);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Session stored', publicKey })
  };
};

export { handler };