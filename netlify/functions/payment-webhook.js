const { read, write } = require('@netlify/blobs');

// 🔧 Token generator function
function generateToken(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

exports.handler = async function(event) {
  try {
    const token = generateToken();

    const blobKey = 'valid-tokens.json';
    const existing = await read(blobKey, { encoding: 'json' }) || [];

    const updatedTokens = [...existing, token];

    await write(blobKey, JSON.stringify(updatedTokens), {
      contentType: 'application/json'
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
