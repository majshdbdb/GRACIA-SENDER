const twilio = require("twilio");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ error: "Phone number missing" });
  }

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  try {
    const message = await client.messages.create({
      from: "whatsapp:+14155238886", // nomor WA Twilio sandbox
      to: whatsapp:+62${phone},   // nomor user
      body: Kode OTP kamu: ${Math.floor(100000 + Math.random() * 900000)}
    });

    res.status(200).json({ success: true, sid: message.sid });

  } catch (err) {
    console.error("Twilio Error:", err);
    res.status(500).json({ error: "Failed to send OTP", detail: err.message });
  }
};
