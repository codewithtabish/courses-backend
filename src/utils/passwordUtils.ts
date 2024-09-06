import bcrypt from "bcrypt";

// Define the number of rounds for salt generation
const SALT_ROUNDS = 10;

/**
 * Hash a plain text password.
 * @param password - The plain text password.
 * @returns A promise that resolves to the hashed password.
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify if a plain text password matches a hashed password.
 * @param password - The plain text password.
 * @param hashedPassword - The hashed password.
 * @returns A promise that resolves to a boolean indicating whether the passwords match.
 */
export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
