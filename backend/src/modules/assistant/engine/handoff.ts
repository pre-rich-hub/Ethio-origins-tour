export function containsHandoffPhrase(text: string, phrase: string): boolean {
  if (!text || !phrase) return false;
  return text.toLowerCase().includes(phrase.toLowerCase());
}
