import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Service role key allows bypassing RLS if needed
);

export async function handler(event) {
  const token = event.queryStringParameters?.token;

  if (!token) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing token' }),
    };
  }

  const { data, error } = await supabase
    .from('tokens')
    .select('*')
    .eq('token', token)
    .maybeSingle();

  if (error) {
    console.error("❌ Token validation error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Validation failed' }),
    };
  }

  const isValid = !!data;

  return {
    statusCode: isValid ? 200 : 403,
    body: JSON.stringify({
      valid: isValid,
      message: isValid ? 'Token is valid' : 'Invalid or expired token',
    }),
  };
}
