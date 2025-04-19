const fs = require('fs');
const path = require('path');

const TOKEN_FILE = path.resolve(__dirname, 'tokens.json');

// Load existing tokens
function loadTokens() {
  try {
    const data = fs.readFileSync(TOKEN_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Save updated tokens
function saveTokens(tokens) {
  fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokens, null, 2));
}

exports.handler = async function (event) {
  const { token } = event.queryStringParameters;

  if (!token) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing token' }),
    };
  }

  const tokens = loadTokens();

  if (!tokens.includes(token)) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: 'Invalid or expired token' }),
    };
  }

  // Optional: remove token after use to prevent reuse
  const updatedTokens = tokens.filter((t) => t !== token);
  saveTokens(updatedTokens);

  return {
    statusCode: 200,
    body: JSON.stringify({ valid: true }),
  };
};
