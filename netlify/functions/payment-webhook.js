import { write, list } from '@netlify/blobs';
import { v4 as uuidv4 } from 'uuid';

export async function handler(event) {
  try {
    const body = JSON.parse(event.body || '{}');

    if (body.name !== 'payment_intent.succeeded') {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid event type' }),
      };
    }

    const token = uuidv4().slice(0, 8).toUpperCase();
    const blobKey = 'valid-tokens.json';

    // Get current tokens (returns { blobs: [] }) so we extract keys
    const { blobs } = await list({ prefix: blobKey });
    const validTokens = blobs.map(blob => blob.key.split('/').pop());

    // Save the token in a blob under /valid-tokens/token.json
    await write(`valid-tokens/${token}.json`, JSON.stringify({ valid: true }), {
      contentType: 'application/json'
    });

    console.log("✅ Payment succeeded");
    console.log("🔐 Generated token:", token);
    console.log("🧠 Valid tokens now include:", [...validTokens, token]);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Token saved', token }),
    };
  } catch (err) {
    console.error("❌ Failed to handle webhook", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to handle Airwallex webhook.' }),
    };
  }
}
