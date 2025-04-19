const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(5).toString('base64url').toUpperCase();
}

exports.handler = async function (event) {
  try {
    const token = generateToken();
    const tokenPath = path.join('/tmp', 'valid-tokens.json');

    // Read existing tokens from file
    let tokens = [];
    if (fs.existsSync(tokenPath)) {
      const data = fs.readFileSync(tokenPath, 'utf-8');
      tokens = JSON.parse(data);
    } else {
      console.warn("⚠️ No existing token file. Creating new.");
    }

    // Add new token
    tokens.push(token);

    // Save back to file
    fs.writeFileSync(tokenPath, JSON.stringify(tokens), 'utf-8');

    console.log("✅ Token created:", token);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Token created", token }),
    };

  } catch (err) {
    console.error("❌ Failed to handle webhook", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'webhook error' }),
    };
  }
};
