import fetch from 'node-fetch';
import express from "express";
const app = express();
app.use(express.json());

const TOKEN="8350071961:AAHdrkPxRtv-3RM8bylk9nWtpn4AAs7Xd54";
const CHAT_ID="6472104139";

app.post(`/bot/${TOKEN}`, async (req,res)=>{
  try{
    const msg = req.body.message;
    if(!msg || !msg.text) return res.sendStatus(200);

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

    res.sendStatus(200);
  }catch(e){
    console.log(e);
    res.sendStatus(500);
  }
});

app.listen(3000,()=>console.log("BOT ACTIVE"));
