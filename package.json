const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("RYANCLOUD API v2.9 ONLINE");
});

app.get("/api/status", (req, res) => {
  res.json({
    online: true,
    name: "RYANCLOUD API",
    version: "2.9",
    status: "online",
    server: "RYANCLOUD-01"
  });
});

app.listen(PORT, () => {
  console.log(`RYANCLOUD API running on port ${PORT}`);
});
