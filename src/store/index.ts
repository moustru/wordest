import type { CommonCounter } from "@/types/Counter";
import type { WordObject } from "@/types/Word";
import { setWordsArray } from "@/helpers/words";
import type { StorageObject, QuestionStep } from "@/types/Storage";

const trainerStorage = JSON.parse(localStorage.getItem("trainerData")!);

/**
 * @class
 * Глобальный стейт приложения. Тут же реализованы все манипуляции с данными
 */
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

  /**
   * Установка текущего слова (наподобие указателя)
   */
  setCurrentWord() {
    this.actionWithStorageRecord(() => {
      this.currentWord = this.words[this.questionsCounter.current];
    });
  }

  /**
   * Перемещение между вопросами
   *
   * @param step Шаг перемещения. 1 - вперед, -1 - назад
   */
  switchQuestion(step: QuestionStep) {
    this.actionWithStorageRecord(() => {
      this.questionsCounter.current += step;
      this.setCurrentWord();
      this.resetLetterCurrentCounter();
    });
  }

  /**
   * Переход к следующему вопросу
   */
  nextQuestion() {
    this.switchQuestion(1);
  }

  /**
   * Возврат к предыдущему вопросу
   */
  prevQuestion() {
    this.switchQuestion(-1);
  }

  /**
   * Переход к следующей букве (внутри вопроса)
   *
   * @param guessedLetter Угаданная буква
   */
  nextLetter(guessedLetter: string) {
    const relatedLetter = this.currentWord.shuffled.find((letter) => letter === guessedLetter)!;

    this.currentWord.shuffled.splice(this.currentWord.shuffled.indexOf(relatedLetter), 1);
    this.lettersCounter.current++;

    this.actionWithStorageRecord(() => {
      const { word, shuffled } = this.currentWord;

      this.currentWord.currentLetter = word.length - shuffled.length;
    });
  }

  /**
   * Завершение вопроса
   */
  finishQuestion() {
    this.currentWord.isFinished = true;
  }

  /**
   * Сброс счетчика букв (либо до 0, либо до значения в localStorage)
   */
  resetLetterCurrentCounter() {
    this.actionWithStorageRecord(() => {
      this.lettersCounter.current = this.currentWord?.currentLetter ?? 0;
    });
  }

  /**
   * Установка итогового кол-ва букв в слове
   *
   * @param wordLength Длина слова
   */
  setLetterTotalCounter(wordLength: number) {
    this.actionWithStorageRecord(() => {
      this.lettersCounter.total = wordLength;
    });
  }

  /**
   * Обработчик ошибки в слове
   */
  addMistake() {
    this.actionWithStorageRecord(() => {
      this.currentWord.mistakes++;
    });
  }

  /**
   * Завершение тренировки
   */
  finishTraining() {
    this.isFinished = true;
    this.removeStorage();
  }

  /**
   * Инициализация хранилища
   */
  initStorage() {
    const isStorageExists = !!localStorage.getItem("trainerData");

    if (!isStorageExists) this.recordStorage();
  }

  /**
   * Запись в хранилище
   */
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

  /**
   * Сброс хранилища через сброс стейта и его повторной инициализации
   */
  resetStorage() {
    this.questionsCounter = {
      current: 0,
      total: 5
    };

    this.words = setWordsArray();

    this.currentWord = this.words[this.questionsCounter.current];

    this.lettersCounter = {
      current: this.currentWord.currentLetter,
      total: this.currentWord.word.length
    };

    this.initStorage();
  }

  /**
   * Удаление хранилища из localStorage
   */
  removeStorage() {
    localStorage.removeItem("trainerData");
  }

  /**
   * Функция-обертка для регистрации каких-либо изменений в стейте для их записи в хранилище
   *
   * @param callback Колбэк, изменяющий стейт
   */
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
