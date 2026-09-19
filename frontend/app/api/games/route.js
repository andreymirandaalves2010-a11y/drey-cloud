import { NextResponse } from "next/server";
const { pool } = require("../db");

/**
 * GET /api/games
 */
export async function GET(req) {
  try {
    const [games] = await pool.query(
      "SELECT id, name, slug, description, cover, banner, status, created_at FROM games"
    );

    return NextResponse.json(games);
  } catch (error) {
    console.error("Get games error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch games",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/games
 */
export async function POST(req) {
  try {
    const { name, slug, description, cover, banner, status } = await req.json();

    if (!name || !slug) {
      return NextResponse.json(
        {
          error: "Name and slug required",
        },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      `
      INSERT INTO games
      (name, slug, description, cover, banner, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
      `,
      [name, slug, description, cover, banner, status || "available"]
    );

    return NextResponse.json(
      {
        message: "Game created",
        id: result.insertId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create game error:", error);

    return NextResponse.json(
      {
        error: "Failed to create game",
      },
      { status: 500 }
    );
  }
}
