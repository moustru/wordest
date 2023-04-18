import AppStore from "@/store";
import delay from "@/helpers/delay";
import { renderLetters, addLetterToAnswerBlock } from "./letters";

export function renderMistakeInQuestion() {
  const isWrong = true;
  const reminderOfAWord = AppStore.getCurrentWord.word.slice(AppStore.getLetters.current).split("");

  delay(() => {
    reminderOfAWord.forEach((letter) => {
      addLetterToAnswerBlock(letter, isWrong);
    });
  });
}
