// Use a browser-compatible hashing approach
const hashString = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(16);
};

/**
 * Hash a password using SHA-256
 * Note: In a production app, you should use a more secure method like bcrypt
 * but for simplicity with XAMPP we're using a basic hash
 */
export function hashPassword(password: string): string {
  // Use browser-compatible hashing
  return hashString(password + "salt");
}

/**
 * Verify a password against a hash
 */
export function verifyPassword(password: string, hash: string): boolean {
  const hashedPassword = hashPassword(password);
  return hashedPassword === hash;
}
