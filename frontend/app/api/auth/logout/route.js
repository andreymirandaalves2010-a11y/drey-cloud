import { NextResponse } from "next/server";

export async function POST(req) {
  const response = NextResponse.json({
    success: true,
    message: "Logout realizado com sucesso.",
  });

  response.cookies.delete("drey_cloud_token");

  return response;
}
