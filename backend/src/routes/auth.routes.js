const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { pool } = require("../db");

const router = express.Router();

// ==========================================
// CONFIGURAÇÃO DO COOKIE
// ==========================================

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000
};

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

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedName) {
      return res.status(400).json({
        success: false,
        message: "O nome é obrigatório."
      });
    }

    // ========================================
    // VERIFICAR EMAIL
    // ========================================

    const [existingUsers] = await pool.query(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [normalizedEmail]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Este email já está cadastrado."
      });
    }

    // ========================================
    // CRIAR HASH DA SENHA
    // ========================================

    const passwordHash = await bcrypt.hash(
      password,
      12
    );

    // ========================================
    // CRIAR USUÁRIO
    // ========================================

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
        normalizedName,
        normalizedEmail,
        passwordHash
      ]
    );

    // ========================================
    // GERAR JWT
    // ========================================

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

    // ========================================
    // COOKIE
    // ========================================

    res.cookie(
      "drey_cloud_token",
      token,
      cookieOptions
    );

    // ========================================
    // RESPOSTA
    // ========================================

    return res.status(201).json({
      success: true,
      message: "Conta criada com sucesso.",
      user: {
        id: result.insertId,
        name: normalizedName,
        email: normalizedEmail,
        role: "USER",
        hours_played: 0,
        games_played: 0,
        achievements: 0,
        rating: 0
      }
    });

  } catch (error) {
    console.error(
      "ERRO NO CADASTRO:",
      error
    );

    return res.status(500).json({
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

    const normalizedEmail = email
      .trim()
      .toLowerCase();

    // ========================================
    // BUSCAR USUÁRIO
    // ========================================

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
      WHERE email = ?
      LIMIT 1`,
      [normalizedEmail]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Email ou senha incorretos."
      });
    }

    const user = users[0];

    // ========================================
    // VERIFICAR SENHA
    // ========================================

    const passwordCorrect =
      await bcrypt.compare(
        password,
        user.password_hash
      );

    if (!passwordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Email ou senha incorretos."
      });
    }

    // ========================================
    // GERAR JWT
    // ========================================

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

    // ========================================
    // COOKIE
    // ========================================

    res.cookie(
      "drey_cloud_token",
      token,
      cookieOptions
    );

    // ========================================
    // RESPOSTA
    // ========================================

    return res.json({
      success: true,
      message: "Login realizado com sucesso.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        hours_played: Number(
          user.hours_played || 0
        ),
        games_played: Number(
          user.games_played || 0
        ),
        achievements: Number(
          user.achievements || 0
        ),
        rating: Number(
          user.rating || 0
        )
      }
    });

  } catch (error) {
    console.error(
      "ERRO NO LOGIN:",
      error
    );

    return res.status(500).json({
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
    const token =
      req.cookies?.drey_cloud_token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Usuário não autenticado."
      });
    }

    // ========================================
    // VALIDAR JWT
    // ========================================

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // ========================================
    // BUSCAR USUÁRIO ATUALIZADO
    // ========================================

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
      WHERE id = ?
      LIMIT 1`,
      [decoded.id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado."
      });
    }

    const user = users[0];

    // ========================================
    // RESPOSTA
    // ========================================

    return res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        hours_played: Number(
          user.hours_played || 0
        ),
        games_played: Number(
          user.games_played || 0
        ),
        achievements: Number(
          user.achievements || 0
        ),
        rating: Number(
          user.rating || 0
        ),
        created_at: user.created_at
      }
    });

  } catch (error) {
    console.error(
      "ERRO /ME:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message: "Sessão inválida ou expirada."
    });
  }
});

// ==========================================
// LOGOUT
// ==========================================

router.post("/logout", (req, res) => {
  res.clearCookie(
    "drey_cloud_token",
    {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction
        ? "none"
        : "lax"
    }
  );

  return res.json({
    success: true,
    message: "Logout realizado com sucesso."
  });
});

// ==========================================
// EXPORTAÇÃO
// ==========================================

module.exports = router;