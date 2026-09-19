import { NextResponse } from "next/server";
const { pool } = require("../db");

export async function GET(req) {
  try {
    await pool.query("SELECT 1");

    return NextResponse.json({
      success: true,
      api: "online",
      database: "online",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Health check error:", error);

    return NextResponse.json(
      {
        success: false,
        api: "online",
        database: "offline",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
