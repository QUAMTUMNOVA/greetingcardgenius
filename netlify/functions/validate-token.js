const { validTokens } = require("./payment-webhook");

exports.handler = async function (event) {
  try {
    const token = event.queryStringParameters?.token;

    if (validTokens.has(token)) {
      return {
        statusCode: 200,
        body: JSON.stringify({ valid: true }),
      };
    }

    return {
      statusCode: 403,
      body: JSON.stringify({ valid: false }),
    };
  } catch (err) {
    console.error("❌ Failed to validate token:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Token validation failed" }),
    };
  }
};
