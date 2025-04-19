const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // make sure this is set in Netlify
);

exports.handler = async function (event) {
  try {
    const token = crypto.randomBytes(5).toString('base64url').toUpperCase();

    const { error } = await supabase
      .from('tokens')
      .insert([{ token }]); // make sure this matches the column name

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
