import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "../db.js";
import authenticateJWT from "../middleware/authenticateJWT.js";
import multer from "multer";
import FormData from "form-data";
import fs from "fs";
import fetch from "node-fetch";
const upload = multer({ dest: "uploads/" });

dotenv.config();

const router = express.Router();
const JWT_TOKEN = process.env.JWT_TOKEN;

router.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await pool.query(
      "SELECT * FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );

    if (userExists.rows.length !== 0) {
      return res
        .status(400)
        .json({ message: "Username or email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserResult = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );

    const newUser = newUserResult.rows[0];
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      JWT_TOKEN,
      { expiresIn: "30m" }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/api/login", async (req, res) => {
  const { userOrEmail, password } = req.body;
  try {
    const findUsers = await pool.query(
      "SELECT * FROM users WHERE username = $1 OR email = $1",
      [userOrEmail]
    );

    if (findUsers.rows.length === 0) {
      return res
        .status(401)
        .json({ message: "User not found. Please try again." });
    }

    const user = findUsers.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_TOKEN,
      { expiresIn: "30m" }
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/api/journals", authenticateJWT, async (req, res) => {
  const { title, notes, image } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "INSERT INTO journals (user_id, title, notes, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, title, notes, image]
    );

    const newJournal = result.rows[0];
    res.status(201).json(newJournal);
  } catch (err) {
    console.error("Database insert failed:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/api/journals", authenticateJWT, async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await pool.query(
      "SELECT * FROM journals WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Failed to fetch journals:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/api/journals/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM journals WHERE id = $1", [id]);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Failed to delete journal entry:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/api/journals/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { title, notes, image } = req.body;

  try {
    const journalCheck = await pool.query(
      "SELECT * FROM journals WHERE id = $1 AND user_id = $2",
      [id, userId]
    );

    if (journalCheck.rows.length === 0) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this journal entry" });
    }

    const updatedResult = await pool.query(
      `UPDATE journals
       SET title = $1, notes = $2, image_url = $3, updated_at = NOW()
       WHERE id = $4
       RETURNING *`,
      [title, notes, image, id]
    );

    res.status(200).json(updatedResult.rows[0]);
  } catch (err) {
    console.error("Failed to update journal entry:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post(
  "/api/identify",
  authenticateJWT,
  upload.single("image"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const form = new FormData();

    form.append("images", fs.createReadStream(req.file.path));
    form.append("organs", JSON.stringify(["leaf"]));

    try {
      const response = await fetch(
        `https://my-api.plantnet.org/v2/identify/all?api-key=${process.env.PLANTNET_API_KEY}`,
        {
          method: "POST",
          body: form,
        }
      );

      const data = await response.json();
      fs.unlinkSync(req.file.path);

      res.json(data);
    } catch (error) {
      console.error("PlantNet API error:", error);
      res.status(500).json({ error: "Failed to identify plant" });
    }
  }
);

export default router;
