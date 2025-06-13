import path from "path";
import express from "express";
import fetch from "node-fetch";

const app = express();

app.use(express.static(path.join(__dirname, "client/dist")));

(async () => {
  const response = await fetch(
    "https://trefle.io/api/v1/plants?token=YOUR_TREFLE_TOKEN"
  );
  const json = await response.json();
  console.log(json);
})();

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});
