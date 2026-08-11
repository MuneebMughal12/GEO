import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

/**
 * Simple single-admin auth: a signed session cookie.
 *
 * Credentials and secret come from env. Sensible dev defaults let the admin UI
 * be tested before the client sets real values — replace them in production.
 */

const COOKIE = "geo_admin_session";
const DAY = 60 * 60 * 24;

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "geo-admin-2026";
const AUTH_SECRET = process.env.AUTH_SECRET || process.env.JWT_SECRET || "dev-only-secret-change-me";

const secretKey = new TextEncoder().encode(AUTH_SECRET);

export function usingDefaultCredentials(): boolean {
  return !process.env.ADMIN_PASSWORD || (!process.env.AUTH_SECRET && !process.env.JWT_SECRET);
}

export function checkCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export async function createSession(): Promise<void> {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);

  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: DAY * 7,
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, secretKey);
    return true;
  } catch {
    return false;
  }
}
