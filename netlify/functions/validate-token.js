const { write, list } = require('@netlify/blobs');

export async function handler(event) {
  try {
    const token = event.queryStringParameters.token;

    if (!token) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Token missing' }),
      };
    }

    const blob = await read('valid-tokens.json');
    const tokens = blob ? JSON.parse(blob.body.toString()) : [];

    const isValid = tokens.includes(token);

    if (!isValid) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: 'Invalid or expired access link.' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error('❌ Validation failed:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Validation failed' }),
    };
  }
}
