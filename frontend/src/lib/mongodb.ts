import { MongoClient, Db } from "mongodb";

/**
 * Lazy MongoDB connection.
 *
 * The site must build and run even before the client provides a connection
 * string, so nothing connects at import time. `getDb()` returns null when
 * MONGODB_URI is not set — callers then fall back to the static seed data.
 */

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "geogroup";

// Cache the client across hot reloads / serverless invocations.
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient> | null = null;

function getClientPromise(): Promise<MongoClient> | null {
  if (!uri) return null;
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
  return clientPromise;
}

export function isDbConfigured(): boolean {
  return Boolean(uri);
}

export async function getDb(): Promise<Db | null> {
  const promise = getClientPromise();
  if (!promise) return null;
  const client = await promise;
  return client.db(dbName);
}
