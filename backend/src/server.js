const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const { pool, testDatabase } = require("./db");
const authRoutes = require("./routes/auth.routes");9
const gamesRoutes = require("./routes/games.routes");

const app = express();
const PORT = process.env.PORT || 3001;


// ================================
// MIDDLEWARE
// ================================

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(cookieParser());


// ================================
// HOME
// ================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Drey Cloud API online 🚀"
  });
});


// ================================
// HEALTH
// ================================

app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.json({
      success: true,
      api: "online",
      database: "online"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      api: "online",
      database: "offline"
    });
  }
});


// ================================
// AUTENTICAÇÃO
// ================================

app.use("/api/auth", authRoutes);

// ================================
// GAMES
// ================================

app.use("/api/games", gamesRoutes);


// ================================
// 404
// ================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Rota não encontrada."
  });
});


// ================================
// SERVIDOR
// ================================

app.listen(PORT, async () => {
  console.log("");
  console.log("====================================");
  console.log("          DREY CLOUD API");
  console.log("====================================");
  console.log(`🚀 API: http://localhost:${PORT}`);
  console.log(`❤️ Health: http://localhost:${PORT}/api/health`);
  console.log(`👤 User: http://localhost:${PORT}/api/auth/me`);
  console.log("====================================");
  console.log("");

  await testDatabase();
});