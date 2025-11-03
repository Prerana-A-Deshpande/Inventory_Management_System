import express from "express"
import twilio from "twilio"
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

router.post("/send-whatsapp", async (req, res) => {
    const { phone, imageUrl } = req.body;
    try {
        await client.messages.create({
            from: "whatsapp:+14155238886",
            to: `whatsapp:+91${phone}`,
            body: "🧾 Hello! Here is your bill from Inentory Store.",
            mediaUrl: [imageUrl],
        })
        res.json({ success: true, message: "Bill sent successfully via WhatsApp!" });
    } catch (error) {
        console.error("Error sending WhatsApp:", error);
        res.status(500).json({ success: false, message: "Failed to send WhatsApp message." });
    }
})

export default router;