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

app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
