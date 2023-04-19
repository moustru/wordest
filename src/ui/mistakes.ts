import AppStore from "@/store";
import delay from "@/helpers/delay";
import { addLetterToAnswerBlock } from "./letters";

/**
 * @exports
 * Рендеринг ошибки в блок ответа (перегоняются все оставшиеся буквы и перекрашиваются в красный цвет)
 */
export function renderMistakeInQuestion() {
  const isWrong = true;
  const reminderOfAWord = AppStore.getCurrentWord.word.slice(AppStore.getLetters.current).split("");

  delay(() => {
    reminderOfAWord.forEach((letter) => {
      addLetterToAnswerBlock(letter, isWrong);
    });
  });
}
