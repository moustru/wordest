import type { WordObject } from "./Word";

export default interface StorageObject {
  question: number;
  letter: number;
  words: WordObject[];
}
