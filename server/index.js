const express = require("express");
const path = require("path");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

const buildPath = path.join(__dirname, "..", "client", "dist");
app.use(express.static(buildPath));

const TOKEN = process.env.token;

app.get("/api/plants", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const response = await fetch(
      `https://trefle.io/api/v1/plants?token=${TOKEN}&page=${page}`
    );

    if (!response.ok) {
      const errorBody = await response.json();
      return res.status(response.status).json({
        error: "Failed to fetch from external API",
        details: errorBody,
      });
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.log("Server error:", err);
    res.status(500).json({ error: "Error fetching file", details: err });
  }
});

app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
