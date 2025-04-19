const { read, write } = require('@netlify/blobs');

exports.handler = async function (event) {
  const token = event.queryStringParameters?.token;
  if (!token) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing token' }),
    };
  }

  try {
    const blobKey = 'valid-tokens.json';
    const res = await fetch(`/.netlify/blobs/${blobKey}`);
    const validTokens = res.ok ? await res.json() : [];

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
