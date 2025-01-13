export function isNonNumericString(word: string) {
  return /^[a-zA-Z_]+$/.test(word);
}
