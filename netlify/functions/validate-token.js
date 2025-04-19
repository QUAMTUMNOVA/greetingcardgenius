const fs = require('fs');

const FILE_PATH = '/tmp/valid-tokens.json';

exports.handler = async function (event) {
  const token = event.queryStringParameters?.token;

  if (!token) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Token missing' }),
    };
  }

  try {
    const raw = fs.readFileSync(FILE_PATH, 'utf-8');
    const tokens = JSON.parse(raw);

    const isValid = tokens.includes(token);

    return {
      statusCode: isValid ? 200 : 403,
      body: JSON.stringify({
        valid: isValid,
        message: isValid ? 'Token is valid' : 'Token invalid or expired',
      }),
    };
  } catch (err) {
    console.error("❌ Token validation failed:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Token validation failed' }),
    };
  }
};
