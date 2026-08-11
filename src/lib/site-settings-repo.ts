import "server-only";
import { getDb } from "@/lib/mongodb";
import { DEFAULT_SITE_SETTINGS, SiteSettings } from "@/lib/models";
import { touchContentVersion } from "@/lib/content-version";

const KEY = "main";

export async function getSiteSettings(): Promise<SiteSettings> {
  const db = await getDb();
  if (!db) return DEFAULT_SITE_SETTINGS;
  const settings = await db.collection("site_settings").findOne<{ heroImage?: string; footerImage?: string; updatedAt?: string }>({ key: KEY });
  return {
    heroImage: settings?.heroImage || DEFAULT_SITE_SETTINGS.heroImage,
    footerImage: settings?.footerImage || DEFAULT_SITE_SETTINGS.footerImage,
    updatedAt: settings?.updatedAt,
  };
}

export async function updateSiteSettings(input: Partial<SiteSettings>): Promise<SiteSettings> {
  const db = await getDb();
  if (!db) throw new Error("MongoDB is not configured");
  const current = await getSiteSettings();
  const next = {
    heroImage: input.heroImage?.trim() || current.heroImage,
    footerImage: input.footerImage?.trim() || current.footerImage,
    updatedAt: new Date().toISOString(),
  };
  await db.collection("site_settings").updateOne({ key: KEY }, { $set: next }, { upsert: true });
  await touchContentVersion();
  return next;
}
