const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");

require("dotenv").config();

// Routes
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
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Permite requisições sem Origin, como algumas ferramentas/API
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("CORS bloqueou:", origin);
      return callback(new Error("Origin não permitida pelo CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ========================================
// HEALTH CHECK
// ========================================

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Drey Cloud Backend is running",
  });
});

// ========================================
// ROUTES
// ========================================

app.use("/api/auth", authRoutes);
app.use("/api/games", gamesRoutes);
app.use("/api/machines", machinesRoutes);
app.use("/api/sessions", sessionsRoutes);
app.use("/api/admin", adminRoutes);

// ========================================
// 404 HANDLER
// ========================================

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

// ========================================
// ERROR HANDLER
// ========================================

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    error: "Internal Server Error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "An error occurred",
  });
});

module.exports = app;