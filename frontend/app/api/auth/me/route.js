import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");
const { pool } = require("../../db");

export async function GET(req) {
  try {
    // Extrair token do cookie
    const token = req.cookies.get("drey_cloud_token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Usuário não autenticado.",
        },
        { status: 401 }
      );
    }

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar usuário
    const [users] = await pool.query(
      `SELECT
        id,
        name,
        email,
        role,
        created_at
       FROM users
       WHERE id = ?
       LIMIT 1`,
      [decoded.id]
    );

    if (users.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Usuário não encontrado.",
        },
        { status: 404 }
      );
    }

    const user = users[0];

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.error("ERRO /api/auth/me:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Sessão inválida ou expirada.",
      },
      { status: 401 }
    );
  }
}
