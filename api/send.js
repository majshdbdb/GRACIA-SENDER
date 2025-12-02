export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST allowed" });

  const { phone, message } = req.body;
  if (!phone || !message) return res.status(400).json({ error: "phone & message required" });

  const tgToken = process.env.TG_TOKEN;
  const chatId = process.env.CHAT_ID;

  const text = `SEND_WA|${phone}|${message}`;
  await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({ chat_id: chatId, text })
  });

  return res.status(200).json({ success: true });
}