import { createClient } from '@supabase/supabase-js'
import fetch from 'node-fetch'
import crypto from 'crypto'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    global: { fetch } // ⬅ ensures fetch works under Netlify's DNS
  }
)

export const handler = async () => {
  const token = crypto.randomBytes(5).toString('base64url').toUpperCase()

  const { error } = await supabase.from('tokens').insert([{ token }])

  if (error) {
    console.error('❌ Supabase insert failed', error.message, error.details)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Database insert failed', reason: error.message })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Token created', token })
  }
}
