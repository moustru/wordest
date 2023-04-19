import type { WordObject } from "@/types/Word";

/**
 * @exports
 * Функция нахождения слова с самым большим кол-вом ошибок
 *
 * @param words Массив слоа
 * @returns Искомое слово, или надпись "Отсутствуют", если тест выполнен без ошибок
 */
export function findWordWithMostMistakes(words: WordObject[]) {
  const maxMistakes = words.reduce((a, b) => Math.max(a, b.mistakes), -Infinity);

  return maxMistakes !== 0
    ? words.find((word) => word.mistakes === maxMistakes)!.word
    : "Отсутствуют";
}
