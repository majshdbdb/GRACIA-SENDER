const twilio = require("twilio");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  let body = "";
  req.on("data", chunk => body += chunk);
  req.on("end", async () => {
    let data = {};
    try { data = JSON.parse(body || "{}"); } catch (e) {
      return res.status(400).json({ error: "Invalid JSON" });
    }

    const phone = data.phone;
    if (!phone) return res.status(400).json({ error: "Phone missing" });

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    try {
      const otp = Math.floor(100000 + Math.random() * 900000);

      const message = await client.messages.create({
        from: "whatsapp:+14155238886",
        to: `whatsapp:+62${phone}`,
        body: `Kode OTP kamu: ${otp}`,
      });

      return res.status(200).json({ ok: true, sid: message.sid });

    } catch (err) {
      console.log("TWILIO ERROR:", err);
      return res.status(500).json({ error: err.message });
    }
  });
};
