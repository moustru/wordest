import WORDS from "@/data/words";
import type { WordObject } from "@/types/Word";
import { shuffleLetters } from "./letters";

export function setWordsArray(): WordObject[] {
  const wordArray: WordObject[] = [];

  while (wordArray.length < 6) {
    const relatedIndex = Math.round(Math.random() * (WORDS.length - 1));

    if (!wordArray.map((wordObject) => wordObject.word).includes(WORDS[relatedIndex])) {
      wordArray.push({
        word: WORDS[relatedIndex],
        shuffled: shuffleLetters(WORDS[relatedIndex]),
        mistakes: 0
      });
    }
  }

  return wordArray;
}
