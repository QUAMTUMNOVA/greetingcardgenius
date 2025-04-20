const https = require('https');

exports.handler = async function () {
  const token = [...Array(10)].map(() => Math.random().toString(36)[2]).join('').toUpperCase();

  const data = JSON.stringify({ token });

  const options = {
    hostname: 'qbigiaryprmkctxaxby.supabase.co',
    port: 443,
    path: '/rest/v1/tokens',
    method: 'POST',
    headers: {
      'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let body = '';
      res.on('data', chunk => (body += chunk));
      res.on('end', () => {
        console.log("✅ Token created:", token);
        resolve({
          statusCode: 200,
          body: JSON.stringify({ message: "Token created", token })
        });
      });
    });

    req.on('error', error => {
      console.error("❌ HTTPS insert failed", error);
      resolve({
        statusCode: 500,
        body: JSON.stringify({ error: "HTTPS insert failed", reason: error.message })
      });
    });

    req.write(data);
    req.end();
  });
};
