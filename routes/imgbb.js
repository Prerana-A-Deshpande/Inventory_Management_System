import express from "express"
import axios from "axios"
import dotenv from "dotenv"
import FormData from "form-data";

dotenv.config();
const router = express.Router()

router.post("/upload", async (req, res) => {
  const { imageBase64 } = req.body;
  try {
    const formData = new FormData();
    formData.append("image", imageBase64);

    const imgbbUrl = `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`;
    const response = await axios.post(imgbbUrl, formData, {
      headers: formData.getHeaders(),
    });

    res.json({ imageUrl: response.data.data.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to upload image" });
  }
});

export default router;