const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");
require("dotenv").config();
const authenticateJWT = require("../middleware/authenticateJWT");
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
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUserResult = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );
    const newUser = newUserResult.rows[0];
    const token = jwt.sign(
      { userId: newUser.id, username: newUser.username },
      JWT_TOKEN,
      { expiresIn: "1h" }
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
    return res.status(500).json({ message: "Something went wrong" });
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
      { userId: user.id, username: user.username },
      JWT_TOKEN,
      { expiresIn: "1h" }
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
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
