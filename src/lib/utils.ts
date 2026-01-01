// src/lib/utils.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

/**
 * Converts backend image paths to full URLs
 * @param path - Backend path ("/media/products/abc.jpg") or full URL
 * @returns Full image URL or placeholder
 */
export function getImageUrl(path: string | null | undefined): string {
  if (!path) return "/placeholder.png";
  if (path.startsWith("http")) return path; // Already full URL (S3/CDN)
  return `${API_URL}${path}`;
}
