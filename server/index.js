import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000; // or any port you like

app.use(cors()); // enable CORS for all origins
app.use(express.json()); // to parse JSON request bodies

// Example route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
