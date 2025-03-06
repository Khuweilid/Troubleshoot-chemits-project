import { createHash } from "crypto";

/**
 * Hash a password using SHA-256
 * Note: In a production app, you should use a more secure method like bcrypt
 * but for simplicity with XAMPP we're using a basic hash
 */
export function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

/**
 * Verify a password against a hash
 */
export function verifyPassword(password: string, hash: string): boolean {
  const hashedPassword = hashPassword(password);
  return hashedPassword === hash;
}
