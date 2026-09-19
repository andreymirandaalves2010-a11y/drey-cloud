const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { pool } = require("../db");

const router = express.Router();


// ==========================================
// CADASTRO
// ==========================================

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Nome, email e senha são obrigatórios."
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "A senha deve ter pelo menos 6 caracteres."
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const [existingUsers] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [normalizedEmail]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Este email já está cadastrado."
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const [result] = await pool.query(
      `INSERT INTO users
      (
        name,
        email,
        password_hash,
        role,
        hours_played,
        games_played,
        achievements,
        rating
      )
      VALUES (?, ?, ?, 'USER', 0, 0, 0, 0.0)`,
      [
        name.trim(),
        normalizedEmail,
        passwordHash
      ]
    );

    const token = jwt.sign(
      {
        id: result.insertId,
        email: normalizedEmail,
        role: "USER"
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.cookie("drey_cloud_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      success: true,
      message: "Conta criada com sucesso.",
      user: {
        id: result.insertId,
        name: name.trim(),
        email: normalizedEmail,
        role: "USER",
        hours_played: 0,
        games_played: 0,
        achievements: 0,
        rating: 0
      }
    });

  } catch (error) {
    console.error("ERRO NO CADASTRO:", error);

    res.status(500).json({
      success: false,
      message: "Erro interno ao criar conta."
    });
  }
});


// ==========================================
// LOGIN
// ==========================================

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email e senha são obrigatórios."
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const [users] = await pool.query(
      `SELECT
        id,
        name,
        email,
        password_hash,
        role,
        hours_played,
        games_played,
        achievements,
        rating
       FROM users
       WHERE email = ?`,
      [normalizedEmail]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Email ou senha incorretos."
      });
    }

    const user = users[0];

    const passwordCorrect = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Email ou senha incorretos."
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.cookie("drey_cloud_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      success: true,
      message: "Login realizado com sucesso.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        hours_played: Number(user.hours_played || 0),
        games_played: Number(user.games_played || 0),
        achievements: Number(user.achievements || 0),
        rating: Number(user.rating || 0)
      }
    });

  } catch (error) {
    console.error("ERRO NO LOGIN:", error);

    res.status(500).json({
      success: false,
      message: "Erro interno no login."
    });
  }
});


// ==========================================
// USUÁRIO LOGADO
// ==========================================

router.get("/me", async (req, res) => {
  try {
    const token = req.cookies.drey_cloud_token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Usuário não autenticado."
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const [users] = await pool.query(
      `SELECT
        id,
        name,
        email,
        role,
        hours_played,
        games_played,
        achievements,
        rating,
        created_at
       FROM users
       WHERE id = ?`,
      [decoded.id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado."
      });
    }

    const user = users[0];

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        hours_played: Number(user.hours_played || 0),
        games_played: Number(user.games_played || 0),
        achievements: Number(user.achievements || 0),
        rating: Number(user.rating || 0),
        created_at: user.created_at
      }
    });

  } catch (error) {
    console.error("ERRO /ME:", error);

    res.status(401).json({
      success: false,
      message: "Sessão inválida ou expirada."
    });
  }
});


// ==========================================
// LOGOUT
// ==========================================

router.post("/logout", (req, res) => {
  res.clearCookie("drey_cloud_token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  });

  res.json({
    success: true,
    message: "Logout realizado com sucesso."
  });
});


module.exports = router;