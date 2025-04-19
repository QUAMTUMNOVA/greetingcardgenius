const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

exports.handler = async function (event) {
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
    .eq('value', token)
    .maybeSingle();

  const isValid = !!data;

  return {
    statusCode: isValid ? 200 : 403,
    body: JSON.stringify({
      valid: isValid,
      message: isValid ? 'Token is valid' : 'Invalid or expired token',
    }),
  };
};
