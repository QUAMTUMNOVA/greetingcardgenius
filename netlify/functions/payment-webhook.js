const { read } = require('@netlify/blobs');

export async function handler(event) {
  try {
    const token = generateToken(); // however you're generating it

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
    console.error("❌ Failed to handle webhook", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to handle Airwallex webhook.' }),
    };
  }
}
