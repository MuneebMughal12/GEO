import { NextResponse } from "next/server";
import { getContentVersion } from "@/lib/content-version";

export const dynamic = "force-dynamic";

export async function GET() {
  const contentVersion = await getContentVersion();
  const codeVersion = process.env.VERCEL_GIT_COMMIT_SHA || process.env.NEXT_PUBLIC_BUILD_ID || "local";
  return NextResponse.json(
    { contentVersion, codeVersion },
    { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } },
  );
}
