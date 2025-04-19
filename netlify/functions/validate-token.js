const fs = require('fs');
const path = require('path');

exports.handler = async function (event) {
  const token = event.queryStringParameters?.token;
  const tokenPath = path.join('/tmp', 'valid-tokens.json');

  if (!token) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing token' }),
    };
  }

  try {
    let validTokens = [];
    if (fs.existsSync(tokenPath)) {
      const data = fs.readFileSync(tokenPath, 'utf-8');
      validTokens = JSON.parse(data);
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
    console.error("❌ Failed to validate token", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Validation failed' }),
    };
  }
};
