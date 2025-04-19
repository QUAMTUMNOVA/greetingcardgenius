const { getStore } = require('@netlify/blobs');

exports.handler = async function (event) {
  const token = event.queryStringParameters?.token;
  if (!token) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing token' }),
    };
  }

  try {
    const store = getStore({ name: 'token-store' });
    const blobKey = 'valid-tokens.json';
    const validTokens = await store.get(blobKey, { type: 'json' }) || [];

    const isValid = validTokens.includes(token);
    return {
      statusCode: isValid ? 200 : 403,
      body: JSON.stringify({
        valid: isValid,
        message: isValid ? 'Token is valid' : 'Invalid or expired token',
      }),
    };
  } catch (err) {
    console.error("❌ Failed to validate token", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Validation failed' }),
    };
  }
};
