import { read } from '@netlify/blobs';

export async function handler(event) {
  const url = new URL(event.rawUrl);
  const token = url.searchParams.get('token');

  if (!token) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'No token provided' }),
    };
  }

  try {
    const blob = await read(`valid-tokens/${token}.json`, {
      encoding: 'json'
    });

    if (blob && blob.valid) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
      };
    } else {
      throw new Error("Token not found or invalid");
    }
  } catch (err) {
    return {
      statusCode: 403,
      body: JSON.stringify({ success: false, error: 'Invalid or expired token' }),
    };
  }
}
