const fetch = require('node-fetch'); // polyfill
global.fetch = fetch;

const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

console.log("🔐 Supabase URL:", process.env.SUPABASE_URL);
console.log("🔐 Supabase Service Role Key Present:", !!process.env.SUPABASE_SERVICE_ROLE_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async function (event) {
  try {
    const token = crypto.randomBytes(5).toString('base64url').toUpperCase();

    const { error } = await supabase
      .from('tokens')
      .insert([{ token }]);

    if (error) {
      console.error("❌ Supabase insert failed", error.message, error.details);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Database insert failed", reason: error.message }),
      };
    }

    console.log("✅ Token created:", token);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Token created", token }),
    };
  } catch (err) {
    console.error("❌ Webhook error", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Webhook error", reason: err.message }),
    };
  }
};
