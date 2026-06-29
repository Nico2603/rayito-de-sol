export function normalizePhone(value: string): string {
  const trimmed = value.trim()
  if (trimmed.startsWith('+')) {
    return `+${trimmed.slice(1).replace(/[\s\-()]/g, '')}`
  }
  return trimmed.replace(/[\s\-()]/g, '')
}

export function isValidColombianPhone(value: string): boolean {
  const normalized = normalizePhone(value)
  const digits = normalized.startsWith('+') ? normalized.slice(1) : normalized

  if (digits.startsWith('57')) {
    return digits.length === 12 && digits[2] === '3'
  }

  return digits.length === 10 && digits[0] === '3'
}
