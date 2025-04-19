import { write, list } from '@netlify/blobs';

export async function handler(event) {
  try {
    const body = JSON.parse(event.body);
    const eventName = body.name;

    if (eventName !== 'payment_intent.succeeded') {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Unsupported event' }),
      };
    }

    const token = generateToken(); // Simple token for access
    console.log('✅ Payment succeeded');
    console.log('🔐 Generated token:', token);

    // Store the token in a Netlify Blob
    const key = 'valid-tokens.json';
    const existing = await list({ dir: '/', signal: AbortSignal.timeout(5000) });
    let tokens = [];

    if (existing.blobs.includes(key)) {
      const res = await fetch(`${process.env.BLOBS_READ_URL}/valid-tokens.json`);
      tokens = await res.json();
    }

    tokens.push(token);

    await write(key, JSON.stringify(tokens), {
      metadata: { description: 'List of valid access tokens' },
    });

    console.log('🧠 Valid tokens list now contains:', tokens);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('❌ Failed to handle Airwallex webhook:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to handle Airwallex webhook.' }),
    };
  }
}

function generateToken() {
  return Math.random().toString(36).substring(2, 10).toUpperCase(); // 8-char token
}
