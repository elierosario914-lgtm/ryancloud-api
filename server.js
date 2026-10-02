const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

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

const sessions = new Map();

app.post("/api/session/create", (req, res) => {
  const { game, user, region } = req.body;

  if (!game) {
    return res.status(400).json({
      success: false,
      error: "Falta el juego"
    });
  }

  const id =
    "ELIE-" +
    Date.now().toString(36) +
    "-" +
    Math.random().toString(36).slice(2, 7);

  const session = {
    id,
    game,
    user: user || "RYAN",
    region: region || "America",
    server: "RYANCLOUD-01",
    status: "preparing",
    createdAt: new Date().toISOString()
  };

  sessions.set(id, session);

  res.json({
    success: true,
    session
  });
});

app.get("/api/session/status", (req, res) => {
  const id = req.query.id;

  if (!id || !sessions.has(id)) {
    return res.status(404).json({
      success: false,
      error: "Sesión no encontrada"
    });
  }

  res.json({
    success: true,
    session: sessions.get(id)
  });
});

app.post("/api/session/end", (req, res) => {
  const { id } = req.body;

  if (!id || !sessions.has(id)) {
    return res.status(404).json({
      success: false,
      error: "Sesión no encontrada"
    });
  }

  const session = sessions.get(id);

  session.status = "finished";
  session.finishedAt = new Date().toISOString();

  sessions.set(id, session);

  res.json({
    success: true,
    session
  });
});

app.listen(PORT, () => {
  console.log(`RYANCLOUD API ONLINE - PORT ${PORT}`);
});
