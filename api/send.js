export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Only POST allowed" });

  const { phone, message } = req.body;
  if (!phone || !message)
    return res.status(400).json({ error: "phone & message required" });

  // Kirim langsung ke PowerWA
  const resp = await fetch("https://api.powerwa.my.id/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      number: "62" + phone,
      message: message
    })
  });

  return res.status(200).json({ success: true });
}
