import express from "express";
import crypto from "crypto";

const router = express.Router();

router.post("/api/image-upload", (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const signature = crypto
    .createHash("sha1")
    .update(`timestamp=${timestamp}${apiSecret}`)
    .digest("hex");

  res.json({ signature, timestamp });
});

export default router;
