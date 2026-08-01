import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const enteredPassword = body.password;

  const correctPassword = process.env.ADMIN_PASSWORD;

  if (enteredPassword !== correctPassword) {
    return NextResponse.json({ error: "Неверный пароль" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set("admin_auth", correctPassword as string, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });

  return response;
}
