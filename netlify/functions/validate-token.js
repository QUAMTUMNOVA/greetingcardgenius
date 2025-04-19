const fs = require('fs');
const path = '/tmp/valid-tokens.json';

exports.handler = async function (event) {
  const token = event.queryStringParameters?.token;

  if (!token) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing token' }),
    };
  }

  try {
    let validTokens = [];

    if (fs.existsSync(path)) {
      validTokens = JSON.parse(fs.readFileSync(path, 'utf8'));
    }

    const isValid = validTokens.includes(token);

    return {
      statusCode: isValid ? 200 : 403,
      body: JSON.stringify({
        valid: isValid,
        message: isValid ? 'Token is valid' : 'Invalid or expired token',
      }),
    };
  } catch (err) {
    console.error("❌ Validation failed", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Validation error' }),
    };
  }
};
