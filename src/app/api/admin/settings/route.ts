import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getSiteSettings, updateSiteSettings } from "@/lib/site-settings-repo";

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getSiteSettings());
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    return NextResponse.json(await updateSiteSettings({ heroImage: body.heroImage, footerImage: body.footerImage }));
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to save settings" }, { status: 400 });
  }
}
