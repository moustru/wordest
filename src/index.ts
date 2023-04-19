import "./index.css";
import "./events/eventRegister";

import AppStore from "@/store";
import { loadQuestion } from "./ui/questions";
import { showDisclaimer } from "./ui/additionalScreens";

/**
 * Начальная функция. Если тренировка уже началась, но еще не закончилась - при заходе показываем дисклеймер
 *
 * В ином случае - загружаем вопрос с индексом 0 (т.е. первый)
 */
(function init() {
  const isTrainingBegin = AppStore.getLetters.current > 0 || AppStore.getQuestions.current > 0;
  const isTrainingFinished = AppStore.isFinishedTraining;

  if (isTrainingBegin && !isTrainingFinished) {
    showDisclaimer();
  } else {
    loadQuestion();
  }
})();
