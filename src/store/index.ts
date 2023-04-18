import type { CommonCounter } from "@/types/Counter";
import type { WordObject } from "@/types/Word";
import { setWordsArray } from "@/helpers/words";
import type StorageObject from "@/types/Storage";

const trainerStorage = JSON.parse(localStorage.getItem("trainerData")!);

class AppStore {
  private questionsCounter: CommonCounter;
  private lettersCounter: CommonCounter;
  private words: WordObject[];
  private currentWord: WordObject;
  private isFinished: boolean;

  constructor({
    questionsCounter,
    lettersCounter,
    words
  }: {
    questionsCounter: CommonCounter;
    lettersCounter: CommonCounter;
    words: WordObject[];
  }) {
    this.questionsCounter = questionsCounter;
    this.lettersCounter = lettersCounter;
    this.words = words;
    this.currentWord = this.words[this.questionsCounter.current];
    this.isFinished = false;
    this.initStorage();
  }

  get getQuestions() {
    return this.questionsCounter;
  }

  get getLetters() {
    return this.lettersCounter;
  }

  get getWords() {
    return this.words;
  }

  get getCurrentWord() {
    return this.currentWord;
  }

  get isFinishedTraining() {
    return this.isFinished;
  }

  setCurrentWord() {
    this.actionWithStorageRecord(() => {
      this.currentWord = this.words[this.questionsCounter.current];
    });
  }

  /**
   * Переход к следующему вопросу
   */
  nextQuestion() {
    this.actionWithStorageRecord(() => {
      this.questionsCounter.current++;
      this.setCurrentWord();
      this.resetLetterCurrentCounter();
    });
  }

  /**
   * Переход к следующей букве (внутри вопроса)
   */
  nextLetter(guessedLetter: string) {
    const relatedLetter = this.currentWord.shuffled.find((letter) => letter === guessedLetter)!;

    this.actionWithStorageRecord(() => {
      this.currentWord.shuffled.splice(this.currentWord.shuffled.indexOf(relatedLetter), 1);
      this.lettersCounter.current++;
    });
  }

  resetLetterCurrentCounter() {
    this.actionWithStorageRecord(() => {
      this.lettersCounter.current = 0;
    });
  }

  setLetterTotalCounter(wordLength: number) {
    this.actionWithStorageRecord(() => {
      this.lettersCounter.total = wordLength;
    });
  }

  addMistake() {
    this.actionWithStorageRecord(() => {
      this.currentWord.mistakes++;
    });
  }

  finishTraining() {
    this.isFinished = true;
    this.removeStorage();
  }

  initStorage() {
    const isStorageExists = !!localStorage.getItem("trainerData");

    if (!isStorageExists) this.recordStorage();
  }

  private recordStorage() {
    const { words } = this;

    localStorage.setItem(
      "trainerData",
      JSON.stringify(<StorageObject>{
        question: this.questionsCounter.current,
        letter: this.lettersCounter.current,
        words
      })
    );
  }

  resetStorage() {
    this.questionsCounter = {
      current: 0,
      total: 5
    };

    this.words = setWordsArray();

    this.currentWord = this.words[this.questionsCounter.current];

    this.lettersCounter = {
      current: 0,
      total: this.currentWord.word.length
    };

    this.initStorage();
  }

  removeStorage() {
    localStorage.removeItem("trainerData");
  }

  actionWithStorageRecord(callback: () => void) {
    callback();
    this.recordStorage();
  }
}

export default new AppStore({
  questionsCounter: {
    current: trainerStorage?.question ?? 0,
    total: 5
  },
  lettersCounter: {
    current: trainerStorage?.letter ?? 0,
    total: null
  },
  words: trainerStorage?.words ?? setWordsArray()
});
