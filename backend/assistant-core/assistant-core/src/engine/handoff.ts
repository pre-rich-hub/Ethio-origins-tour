export function containsHandoffPhrase(message: string, phrase: string): boolean {
  const normalizedMessage = message.toLowerCase();
  const normalizedPhrase = phrase.toLowerCase();

  return normalizedPhrase.length > 0 && normalizedMessage.includes(normalizedPhrase);
}
