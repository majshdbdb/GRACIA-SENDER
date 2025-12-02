import twilio from "twilio";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ error: "Phone is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  try {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    await client.messages.create({
      body: Kode OTP kamu adalah: ${otp},
      from: "whatsapp:+14155238886",
      to: "whatsapp:+62" + phone,
    });

    return res.status(200).json({ success: true, otp });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
