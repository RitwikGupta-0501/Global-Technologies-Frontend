// src/lib/utils.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";
const isDev = process.env.NODE_ENV !== "production";

/**
 * Site-wide placeholder image asset
 */
export const SITE_PLACEHOLDER_IMAGE = "/placeholder.svg";

/**
 * Converts backend image paths to full URLs or safe site-wide placeholder.
 * In production mode, debug hostnames (like lh3.googleusercontent.com or picsum.photos)
 * automatically fall back to the site-wide placeholder (/placeholder.svg) to prevent
 * unconfigured host runtime errors.
 *
 * @param path - Backend path ("/media/products/abc.jpg") or full URL
 * @returns Full image URL or site-wide placeholder
 */
export function getImageUrl(path: string | null | undefined): string {
  if (!path) return SITE_PLACEHOLDER_IMAGE;

  if (path.startsWith("http://") || path.startsWith("https://")) {
    try {
      const url = new URL(path);
      const debugHostnames = ["lh3.googleusercontent.com", "picsum.photos"];

      // If in production and image is from a debug-only host, fall back to site-wide placeholder
      if (!isDev && debugHostnames.includes(url.hostname)) {
        return SITE_PLACEHOLDER_IMAGE;
      }

      return path;
    } catch {
      return SITE_PLACEHOLDER_IMAGE;
    }
  }

  // Local static asset check
  if (path.startsWith("/")) {
    if (path.startsWith("/placeholder") || path.startsWith("/logo")) {
      return path;
    }
    return `${API_URL}${path}`;
  }

  return `${API_URL}/${path}`;
}
