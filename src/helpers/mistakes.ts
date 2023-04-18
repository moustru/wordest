import type { WordObject } from "@/types/Word";

export function findWordWithMostMistakes(words: WordObject[]) {
  const maxMistakes = words.reduce((a, b) => Math.max(a, b.mistakes), -Infinity);

  return words.find((word) => word.mistakes === maxMistakes)!.word;
}
