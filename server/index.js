import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import { fileURLToPath } from "url";
import imageUploadRouter from "./uploads/image-upload.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

const buildPath = path.join(__dirname, "..", "client", "dist");
app.use(express.static(buildPath));

app.use(authRoutes);
app.use(imageUploadRouter);

app.get("/test", (req, res) => {
  res.send("Backend updated version!");
});

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
