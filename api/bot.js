export default async function handler(req, res) {
  const TOKEN = process.env.TG_TOKEN;
  try{
    const msg = req.body.message;
    if(!msg || !msg.text) return res.status(200).end();

    const text = msg.text;
    if(text.startsWith("SEND_WA")){
      const parts=text.split("|");
      const phone=parts[1];
      const pesan=parts[2];

      await fetch("https://api.powerwa.my.id/send", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          number:"62"+phone,
          message: pesan
        })
      });
    }

    res.status(200).end();
  }catch(e){
    console.log(e);
    res.status(500).end();
  }
}