const { blobs } = require('@netlify/blobs');
const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(5).toString('base64url').toUpperCase();
}

exports.handler = async function () {
  try {
    const store = blobs.getStore('tokens');
    const token = generateToken();

    let current = [];
    try {
      const { data } = await store.get('valid.json');
      current = JSON.parse(data || '[]');
    } catch (err) {
      console.warn("⚠️ No existing token file. Creating new.");
    }

    const updated = [...current, token];
    await store.set('valid.json', JSON.stringify(updated));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Token created', token }),
    };
  } catch (err) {
    console.error("❌ Failed to handle webhook", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'webhook error' }),
    };
  }
};
