/**
 * API configuration utility.
 * 
 * In development: reads from .env.local (NEXT_PUBLIC_API_URL=http://127.0.0.1:8005)
 * In production:  reads from .env.production (NEXT_PUBLIC_API_URL=https://api.universalsanitary.in)
 * 
 * All fetch calls should use `apiUrl(path)` instead of hardcoding the domain.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8005";

/**
 * Build a full API URL from a relative path.
 * @example apiUrl("/api/v1/products/") => "http://127.0.0.1:8005/api/v1/products/"
 */
export function apiUrl(path: string): string {
  return `${BASE_URL}${path}`;
}

export default BASE_URL;
