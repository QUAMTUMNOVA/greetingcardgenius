const blobs = require('@netlify/blobs');
const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(5).toString('base64url').toUpperCase();
}

exports.handler = async function (event) {
  try {
    const blobKey = 'valid-tokens.json';
    const token = generateToken();

    // Fetch existing tokens using Netlify Blob API
    let current = [];
    try {
      current = await blobs.read(blobKey, { encoding: 'json' }) || [];
    } catch (e) {
      console.warn("⚠️ No existing token file. Creating new.");
    }

    // Append token
    const updatedTokens = [...current, token];
    await blobs.write(blobKey, JSON.stringify(updatedTokens), {
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
