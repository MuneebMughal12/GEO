import { NextRequest, NextResponse } from "next/server";
import { checkCredentials, createSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  let username = "";
  let password = "";
  try {
    const body = await req.json();
    username = String(body.username ?? "");
    password = String(body.password ?? "");
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!checkCredentials(username, password)) {
    return NextResponse.json({ error: "Wrong username or password." }, { status: 401 });
  }

  await createSession();
  return NextResponse.json({ ok: true });
}
