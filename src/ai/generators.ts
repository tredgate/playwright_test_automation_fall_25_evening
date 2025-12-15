// src/ai/
// generators.ts

/**
 * Generates a random password of specified length.
 *
 * @param length - The desired length of the password.
 * @returns A randomly generated password string containing uppercase letters, lowercase letters, numbers, and special characters.
 *
 * @example
 * ```typescript
 * const shortPassword = generatePassword(8);   // Returns an 8-character password like "aB3!xY9@"
 * const mediumPassword = generatePassword(12); // Returns a 12-character password like "Xm4$pL9#qR2&"
 * const longPassword = generatePassword(16);   // Returns a 16-character password like "aB3!xY9@Zm5%nK8^"
 * ```
 */
export function generatePassword(length: number): string {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

/**
 * Generates a random first name.
 *
 * @param sex - Optional parameter to specify gender. Can be "male" or "female".
 *              If not provided, returns a random name from both male and female lists.
 * @returns A randomly selected first name string.
 *
 * @example
 * ```typescript
 * const maleName = generateFirstName("male");     // Returns a male name like "Liam"
 * const femaleName = generateFirstName("female"); // Returns a female name like "Emma"
 * const anyName = generateFirstName();            // Returns any name
 * ```
 */
export function generateFirstName(sex?: "male" | "female"): string {
  const femaleNames = [
    "Emma",
    "Olivia",
    "Ava",
    "Isabella",
    "Sophia",
    "Mia",
    "Charlotte",
    "Amelia",
    "Harper",
    "Evelyn",
  ];
  const maleNames = [
    "Liam",
    "Noah",
    "Oliver",
    "Elijah",
    "James",
    "William",
    "Benjamin",
    "Lucas",
    "Henry",
    "Alexander",
  ];

  let names: string[];
  if (sex === "male") {
    names = maleNames;
  } else if (sex === "female") {
    names = femaleNames;
  } else {
    names = [...femaleNames, ...maleNames];
  }

  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}

const password = generatePassword(12);
console.log(`Generated password: ${password}`);
