const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async function (event) {
  try {
    const token = crypto.randomBytes(5).toString('base64url').toUpperCase();

    const { error } = await supabase
      .from('tokens')
      .insert([{ token }]); // match your column name here

    if (error) {
      console.error("❌ Supabase insert failed", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Database insert failed" }),
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
      body: JSON.stringify({ error: "Webhook error" }),
    };
  }
};
