import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

// mail endpoint
app.post("/send-mail", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ success: false, error: "Eksik bilgi!" });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.RECEIVER_EMAIL,
      subject: `Yeni Mesaj: ${name}`,
      text: message,
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Mail gönderilemedi." });
  }
});

app.listen(PORT, () =>
  console.log(`✅ Server çalışıyor: http://localhost:${PORT}`)
);
