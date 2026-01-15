export function isExternal(src?: string) {
  if (!src) return false;
  return /^https?:\/\//.test(src) || src.startsWith("data:");
}
