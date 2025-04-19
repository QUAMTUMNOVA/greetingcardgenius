const { read } = require('@netlify/blobs');

exports.handler = async (event) => {
  const url = new URL(event.rawUrl);
  const token = url.searchParams.get('token');

  if (!token) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'No token provided.' })
    };
  }

  try {
    const { body } = await read('valid-tokens.json');

    const validTokens = body ? JSON.parse(body) : [];

    if (validTokens.includes(token)) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    } else {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: 'Invalid or expired token.' })
      };
    }
  } catch (err) {
    console.error('Error validating token:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error during token validation.' })
    };
  }
};
