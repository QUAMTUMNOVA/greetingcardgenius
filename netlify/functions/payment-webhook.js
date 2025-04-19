const fs = require('fs');
const path = '/tmp/valid-tokens.json';
const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(5).toString('base64url').toUpperCase();
}

exports.handler = async function () {
  try {
    let validTokens = [];

    if (fs.existsSync(path)) {
      validTokens = JSON.parse(fs.readFileSync(path, 'utf8'));
    }

    const token = generateToken();
    validTokens.push(token);

    fs.writeFileSync(path, JSON.stringify(validTokens));

    console.log("✅ Token created:", token);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Token created', token }),
    };
  } catch (err) {
    console.error("❌ Failed to handle webhook", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Webhook error' }),
    };
  }
};
