import { randomBytes, createHash } from 'crypto';

/**
 * Generates a secure session token and returns its SHA-256 hash.
 * @returns {string} The hashed session token.
 */
export const generateSessionToken = (): string => {
  // Generate a random token
  const token = randomBytes(32).toString('hex');

  // Hash the token using SHA-256
  const hash = createHash('sha256').update(token).digest('hex');

  return hash;
};