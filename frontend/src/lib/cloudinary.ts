import { v2 as cloudinary } from "cloudinary";

/**
 * Cloudinary handles photo storage. The admin panel uploads a file straight
 * from the user's computer; Cloudinary returns a hosted URL which we save on
 * the project. No manual link pasting.
 */

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

let configured = false;

export function isCloudinaryConfigured(): boolean {
  return Boolean(cloudName && apiKey && apiSecret);
}

function ensureConfigured() {
  if (!configured && isCloudinaryConfigured()) {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });
    configured = true;
  }
}

/** Upload a file buffer and return the secure hosted URL. */
export async function uploadImage(
  buffer: Buffer,
  folder = "geogroup/projects"
): Promise<{ url: string; publicId: string }> {
  if (!isCloudinaryConfigured()) {
    throw new Error("Cloudinary is not configured. Add CLOUDINARY_* to .env.local");
  }
  ensureConfigured();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error || !result) return reject(error ?? new Error("Upload failed"));
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(buffer);
  });
}
