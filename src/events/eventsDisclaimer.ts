import AppStore from "@/store";
import { hideDisclaimer } from "@/ui/additionalScreens";
import { loadQuestion } from "@/ui/questions";

/**
 * Функция скрытия дисклеймера и загрузки вопроса
 */
function hideAndLoad() {
  hideDisclaimer();
  loadQuestion();
}

/**
 * @exports
 * Функция обработки положительного ответа
 */
export function handlePositiveDisclaimerEvent() {
  hideAndLoad();
}

/**
 * @exports
 * Функция обработки отрицательного ответа
 */
export function handleNegativeDisclaimerEvent() {
  AppStore.resetStorage();
  hideAndLoad();
}
