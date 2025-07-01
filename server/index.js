const express = require("express");
const path = require("path");
const cors = require("cors");
const authRoutes = require("./routes/auth");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const buildPath = path.join(__dirname, "..", "client", "dist");
app.use(express.static(buildPath));

app.use(authRoutes);

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
