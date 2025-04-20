import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler(event) {
  try {
    const token = crypto.randomBytes(5).toString('base64url').toUpperCase();

    console.log("🔑 Using Supabase URL:", process.env.SUPABASE_URL);
    console.log("🔐 Service Key Present:", !!process.env.SUPABASE_SERVICE_ROLE_KEY);

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
    console.error("❌ Webhook error", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Webhook error", reason: err.message }),
    };
  }
}
