import { NextResponse } from "next/server";
const { pool } = require("../../db");

/**
 * GET /api/games/:id
 */
export async function GET(req, { params }) {
  try {
    const { id } = params;

    const [games] = await pool.query(
      "SELECT * FROM games WHERE id = ?",
      [id]
    );

    if (!games.length) {
      return NextResponse.json(
        {
          error: "Game not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(games[0]);
  } catch (error) {
    console.error("Get game error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch game",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/games/:id
 */
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { name, description, cover, banner, status } = await req.json();

    await pool.query(
      `
      UPDATE games
      SET name = ?,
          description = ?,
          cover = ?,
          banner = ?,
          status = ?
      WHERE id = ?
      `,
      [name, description, cover, banner, status, id]
    );

    return NextResponse.json({
      message: "Game updated",
    });
  } catch (error) {
    console.error("Update game error:", error);

    return NextResponse.json(
      {
        error: "Failed to update game",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/games/:id
 */
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await pool.query("DELETE FROM games WHERE id = ?", [id]);

    return NextResponse.json({
      message: "Game deleted",
    });
  } catch (error) {
    console.error("Delete game error:", error);

    return NextResponse.json(
      {
        error: "Failed to delete game",
      },
      { status: 500 }
    );
  }
}
