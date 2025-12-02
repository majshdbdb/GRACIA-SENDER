export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({"error":"Only POST allowed"});
  }

  const { phone, message } = req.body;

  if(!phone || !message){
    return res.status(400).json({"error":"phone & message required"});
  }

  const tgToken="8350071961:AAHdrkPxRtv-3RM8bylk9nWtpn4AAs7Xd54";
  const chatId="6472104139";

  const text = `SEND_WA|${phone}|${message}`;

  const url = `https://api.telegram.org/bot${tgToken}/sendMessage`;

  const resp = await fetch(url,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      chat_id: chatId,
      text: text
    })
  });

  return res.status(200).json({"success":true});
}
