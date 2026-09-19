import { NextResponse } from "next/server";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("../../db");

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Nome, email e senha são obrigatórios.",
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "A senha precisa ter pelo menos 6 caracteres.",
        },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Verificar se email já existe
    const [existing] = await pool.query(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [normalizedEmail]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Este email já está cadastrado.",
        },
        { status: 409 }
      );
    }

    // Hash da senha
    const passwordHash = await bcrypt.hash(password, 12);

    // Inserir usuário
    const [result] = await pool.query(
      `
      INSERT INTO users
      (name, email, password_hash, role)
      VALUES (?, ?, ?, 'USER')
      `,
      [name.trim(), normalizedEmail, passwordHash]
    );

    // Gerar JWT
    const token = jwt.sign(
      {
        id: result.insertId,
        email: normalizedEmail,
        role: "USER",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const response = NextResponse.json(
      {
        success: true,
        message: "Conta criada com sucesso!",
        user: {
          id: result.insertId,
          name: name.trim(),
          email: normalizedEmail,
          role: "USER",
        },
      },
      { status: 201 }
    );

    // Adicionar cookie
    response.cookies.set("drey_cloud_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("❌ ERRO NO CADASTRO:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erro interno ao criar conta.",
      },
      { status: 500 }
    );
  }
}
