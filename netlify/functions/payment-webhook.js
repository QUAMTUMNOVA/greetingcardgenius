let validTokens = new Set(); // Temporary in-memory storage

exports.handler = async function (event) {
  try {
    const body = JSON.parse(event.body);

    // Confirm it's a successful payment
    const isSuccess =
      body?.name === "payment_intent.succeeded" ||
      body?.event === "payment_intent.succeeded";

    if (!isSuccess) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Event ignored" }),
      };
    }

    // Generate a secure 8-character token
    const token = [...Array(8)]
      .map(() => Math.random().toString(36)[2])
      .join("")
      .toUpperCase();

    validTokens.add(token); // Save to in-memory token store

    console.log("✅ Payment succeeded");
    console.log("🔐 Generated token:", token);
    console.log("🧠 Valid tokens list now contains:", [...validTokens]);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Token stored", token }),
    };
  } catch (err) {
    console.error("❌ Failed to handle Airwallex webhook:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to handle Airwallex webhook." }),
    };
  }
};

// Optional: export token store for your validate function
exports.validTokens = validTokens;
