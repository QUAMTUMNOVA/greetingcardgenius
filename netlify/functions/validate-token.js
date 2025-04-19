const fs = require('fs');
const path = require('path');

exports.handler = async function (event) {
  const token = event.queryStringParameters?.token;
  if (!token) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing token' }),
    };
  }

  try {
    const tokensPath = path.resolve(__dirname, '../data/valid-tokens.json');
    const data = fs.readFileSync(tokensPath, 'utf8');
    const validTokens = JSON.parse(data);

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
      body: JSON.stringify({ error: 'Validation error' }),
    };
  }
};
