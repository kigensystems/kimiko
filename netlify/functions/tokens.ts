import { Handler } from '@netlify/functions';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

const handler: Handler = async (event) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': event.headers.origin || '',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Credentials': 'true'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }

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

    // Create connection to Solana
    const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
    const walletPublicKey = new PublicKey(publicKey);

    // Get all token accounts for the wallet
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(walletPublicKey, {
      programId: TOKEN_PROGRAM_ID,
    });

    // Fetch balance for each token account
    const tokenBalances = await Promise.all(
      tokenAccounts.value.map(async (account) => {
        const balance = await connection.getTokenAccountBalance(account.pubkey);
        const parsedInfo = account.account.data.parsed.info;
        
        return {
          mint: parsedInfo.mint,
          tokenAccount: account.pubkey.toString(),
          amount: balance.value.amount,
          decimals: balance.value.decimals,
          uiAmount: balance.value.uiAmount
        };
      })
    );

    // Filter out zero balances and sort by amount
    const nonZeroBalances = tokenBalances
      .filter(token => Number(token.uiAmount) > 0)
      .sort((a, b) => Number(b.uiAmount) - Number(a.uiAmount));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ tokens: nonZeroBalances })
    };
  } catch (error) {
    console.error('Error fetching token balances:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Failed to fetch token balances' })
    };
  }
};

export { handler };