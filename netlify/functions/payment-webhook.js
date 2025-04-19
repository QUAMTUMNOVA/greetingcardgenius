const { read, write } = require('@netlify/blobs');
const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(5).toString('base64url').toUpperCase();
}

exports.handler = async function (event) {
  try {
    const blobKey = 'valid-tokens.json';
    const token = generateToken();

    // Fetch existing token list
    let current = [];
    try {
      const res = await fetch(`/.netlify/blobs/${blobKey}`);
      if (res.ok) {
        current = await res.json();
      }
    } catch (e) {
      console.warn("No existing token file. Creating new.");
    }

    // Save updated token list
    const updatedTokens = [...current, token];
    await write(blobKey, JSON.stringify(updatedTokens), {
      contentType: 'application/json',
    });

    console.log("✅ Payment succeeded");
    console.log("🔐 Generated token:", token);
    console.log("🧠 Valid tokens list now contains:", updatedTokens);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Token saved', token }),
    };
  } catch (err) {
    console.error("❌ Failed to handle Airwallex webhook", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to handle Airwallex webhook.' }),
    };
  }
};
