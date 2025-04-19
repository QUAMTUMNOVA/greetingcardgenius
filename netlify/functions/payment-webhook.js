const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const FILE_PATH = path.join(__dirname, 'valid-tokens.json');

function generateToken() {
  return crypto.randomBytes(5).toString('base64url').toUpperCase();
}

exports.handler = async function (event) {
  try {
    const token = generateToken();
    let current = [];

    try {
      const raw = fs.readFileSync(FILE_PATH, 'utf-8');
      current = JSON.parse(raw);
    } catch {
      console.warn('⚠️ Token file not found, creating new.');
    }

    const updated = [...current, token];
    fs.writeFileSync(FILE_PATH, JSON.stringify(updated, null, 2));

    console.log("✅ Token created:", token);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Token created', token }),
    };
  } catch (err) {
    console.error("❌ Failed to handle webhook:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Webhook error' }),
    };
  }
};
