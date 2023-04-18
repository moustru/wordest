import "./index.css";
import "./events/eventRegister";

import AppStore from "@/store";
import { loadQuestion } from "./ui/questions";
import { showDisclaimer } from "./ui/additionalScreens";

(function init() {
  const isTrainingBegin = AppStore.getLetters.current > 0 || AppStore.getQuestions.current > 0;
  const isTrainingFinished = AppStore.isFinishedTraining;

  if (isTrainingBegin && !isTrainingFinished) {
    showDisclaimer();
  } else {
    loadQuestion();
  }
})();
