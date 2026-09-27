const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.url === "/api/status") {
    res.end(JSON.stringify({
      online: true,
      name: "RYANCLOUD API",
      version: "2.9",
      status: "online",
      server: "RYANCLOUD-01"
    }));
    return;
  }

  res.setHeader("Content-Type", "text/plain");
  res.end("RYANCLOUD API v2.9 ONLINE");
});

server.listen(PORT, () => {
  console.log("RYANCLOUD API ONLINE");
});
