import AppStore from "@/store";
import delay from "@/helpers/delay";
import { findWordWithMostMistakes } from "@/helpers/mistakes";

const scenarioBlock = document.getElementById("scenario");
const statisticsBlock = document.getElementById("stats");
const withoutMistakesBlock = document.getElementById("without_mistakes")!;
const mistakesCountBlock = document.getElementById("mistakes_count")!;
const mostErrorsBlock = document.getElementById("most_errors")!;
const disclaimerBlock = document.getElementById("disclaimer");

/**
 * Функция показа/скрытия элементов
 *
 * @param showedEl Показываемый элемент
 * @param hidedEl Скрываемый элемент
 */
function showHide(showedEl: HTMLElement, hidedEl: HTMLElement) {
  hidedEl.style.cssText = "display: none !important";
  showedEl.style.cssText = "display: flex !important";
}

/**
 * @exports
 * Функция рендеринга статистики тренировки
 */
export function showStats() {
  AppStore.finishTraining();

  delay(() => {
    showHide(statisticsBlock!, scenarioBlock!);

    withoutMistakesBlock.textContent = String(
      AppStore.getWords.filter((word) => !word.mistakes).length
    );

    mistakesCountBlock.textContent = String(
      AppStore.getWords.map((word) => word.mistakes).reduce((acc, val) => acc + val, 0)
    );

    mostErrorsBlock.textContent = findWordWithMostMistakes(AppStore.getWords);
  });
}

/**
 * @exports
 * Функция скрытия дисклеймера
 */
export function hideDisclaimer() {
  showHide(scenarioBlock!, disclaimerBlock!);
}

/**
 * @exports
 * Функция показа дисклеймера
 */
export function showDisclaimer() {
  showHide(disclaimerBlock!, scenarioBlock!);
}
