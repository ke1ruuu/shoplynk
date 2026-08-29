import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);
const KEY_LENGTH = 64;

/**
 * Hashes a plain-text password using scrypt with a unique cryptographically random salt.
 * Output format: `salt:derivedKey` in hex encoding.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}

/**
 * Verifies a plain-text password against a stored `salt:derivedKey` hash.
 * Uses timingSafeEqual to protect against timing attacks.
 */
export async function verifyPassword(
  password: string,
  storedHash: string
): Promise<boolean> {
  try {
    if (!storedHash || !storedHash.includes(":")) {
      return false;
    }

    const [salt, key] = storedHash.split(":");
    if (!salt || !key) {
      return false;
    }

    const keyBuffer = Buffer.from(key, "hex");
    const derivedKey = (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer;

    if (keyBuffer.length !== derivedKey.length) {
      return false;
    }

    return timingSafeEqual(keyBuffer, derivedKey);
  } catch {
    return false;
  }
}
