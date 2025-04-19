const fs = require('fs');
const path = require('path');

const TOKEN_FILE = path.resolve(__dirname, 'tokens.json');

// Util: generate random 6-character token
function generateToken(length = 6) {
  return Math.random().toString(36).substring(2, 2 + length).toUpperCase();
}

// Load existing tokens
function loadTokens() {
  try {
    const data = fs.readFileSync(TOKEN_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Save tokens
function saveTokens(tokens) {
  fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokens, null, 2));
}

exports.handler = async function (event) {
  try {
    const body = JSON.parse(event.body || '{}');

    if (body.name !== 'payment_intent.succeeded') {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Ignored non-success event.' }),
      };
    }

    const token = generateToken();
    const tokens = loadTokens();

    tokens.push(token);
    saveTokens(tokens);

    console.log('✅ Payment succeeded. New token:', token);
    console.log(`🔗 Success link: /success?token=${token}`);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Token generated.', token }),
    };
  } catch (err) {
    console.error('❌ Failed to handle Airwallex webhook:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to handle Airwallex webhook.' }),
    };
  }
};
