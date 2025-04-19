// Correct CommonJS Netlify function
exports.handler = async function (event, context) {
  try {
    const payload = JSON.parse(event.body);

    // Get the root payment object
    const paymentData = payload.data?.object || {};

    // Extract customer info from latest payment attempt
    const billing = paymentData?.latest_payment_attempt?.payment_method?.card?.billing || {};
    const fullName = `${billing.first_name || "Customer"} ${billing.last_name || ""}`.trim();
    const email = billing.email || "no-email@example.com";

    // Extract customer info from enhanced scheme data if available
    const altName = paymentData?.additional_info?.enhanced_scheme_data?.customer?.first_name;
    const altEmail = paymentData?.additional_info?.customer_activity_data?.linked_social_networks?.[0]?.email;

    const finalName = altName || fullName;
    const finalEmail = altEmail || email;

    // Link to your card or delivery
    const cardLink = "https://greetingcardgenius.com.au/cards/sample_greeting_card.png";

    // Log the delivery
    console.log(`✅ Payment succeeded for ${finalName} <${finalEmail}>`);
    console.log(`🎁 Delivering card: ${cardLink}`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "success",
        message: `Thank you, ${finalName}! Your card is ready.`,
        email: finalEmail,
        download: cardLink
      })
    };
  } catch (err) {
    console.error("❌ Webhook failed:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to handle Airwallex webhook." })
    };
  }
};
