import { parsePhoneNumberFromString } from 'libphonenumber-js'

/**
 * Normalize a phone number to E.164 format (e.g., +33612345678).
 * Returns null if the number is invalid.
 */
export function normalizePhone(input: string): string | null {
  if (!input) return null
  const parsed = parsePhoneNumberFromString(input)
  return parsed?.isValid() ? parsed.number : null
}
