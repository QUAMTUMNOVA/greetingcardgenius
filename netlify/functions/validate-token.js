const { blobs } = require('@netlify/blobs');

exports.handler = async function (event) {
  const token = event.queryStringParameters?.token;
  if (!token) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing token' }),
    };
  }

  try {
    const store = blobs.getStore('tokens');
    const { data } = await store.get('valid.json');
    const tokens = JSON.parse(data || '[]');

    const valid = tokens.includes(token);
    return {
      statusCode: valid ? 200 : 403,
      body: JSON.stringify({
        valid,
        message: valid ? 'Token is valid' : 'Invalid or expired token',
      }),
    };
  } catch (err) {
    console.error("❌ Validation error", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Validation failed' }),
    };
  }
};
