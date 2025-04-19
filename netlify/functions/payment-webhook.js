const { getStore } = require('@netlify/blobs');
const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(5).toString('base64url').toUpperCase();
}

exports.handler = async function (event) {
  try {
    const blobKey = 'valid-tokens.json';
    const store = getStore({ name: 'token-store' });

    let current = [];
    try {
      current = await store.get(blobKey, { type: 'json' }) || [];
    } catch (e) {
      console.warn("⚠️ No existing token file. Creating new.");
    }

    const token = generateToken();
    const updatedTokens = [...current, token];

    await store.set(blobKey, updatedTokens, {
      metadata: { updated: new Date().toISOString() },
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
