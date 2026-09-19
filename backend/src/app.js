const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { pool } = require("./db");

const authRoutes = require("./routes/auth.routes");
const gamesRoutes = require("./routes/games.routes");
const machinesRoutes = require("./routes/machines.routes");
const sessionsRoutes = require("./routes/sessions.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

// ========================================
// MIDDLEWARE
// ========================================

app.use(helmet());

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:3000"
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Permite requisições sem Origin
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("CORS bloqueou:", origin);

      return callback(
        new Error("Origin não permitida pelo CORS")
      );
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS"
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization"
    ]
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(cookieParser());

// ========================================
// HOME
// ========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Drey Cloud API online"
  });
});

// ========================================
// HEALTH CHECK
// ========================================

app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.json({
      success: true,
      api: "online",
      database: "online"
    });
  } catch (error) {
    console.error("Erro no MySQL:", error.message);

    res.status(500).json({
      success: false,
      api: "online",
      database: "offline"
    });
  }
});

// ========================================
// AUTENTICAÇÃO
// ========================================

app.use("/api/auth", authRoutes);

// ========================================
// GAMES
// ========================================

app.use("/api/games", gamesRoutes);

// ========================================
// MÁQUINAS
// ========================================

app.use("/api/machines", machinesRoutes);

// ========================================
// SESSÕES
// ========================================

app.use("/api/sessions", sessionsRoutes);

// ========================================
// ADMIN
// ========================================

app.use("/api/admin", adminRoutes);

// ========================================
// 404
// ========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Rota não encontrada."
  });
});

// ========================================
// ERROS
// ========================================

app.use((err, req, res, next) => {
  console.error("Erro:", err.message);

  res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Erro interno do servidor."
  });
});

// ========================================
// EXPORTAÇÃO
// ========================================

module.exports = app;