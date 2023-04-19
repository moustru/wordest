import AppStore from "@/store";
import { addLetterToAnswerBlock, renderAnswerBlock } from "@/ui/letters";
import { finishQuestion, loadQuestion } from "@/ui/questions";
import { blinkClass } from "@/helpers/htmlClasses";
import { renderMistakeInQuestion } from "@/ui/mistakes";
import delay from "@/helpers/delay";
import { TRIGGERED_KEY_CODES } from "@/helpers/constants";

const lettersBlock = document.getElementById("letters")!;

/**
 * Функция обработки вводимой буквы
 *
 * @param eventValue Значение event
 * @param eventTarget Целевой элемент event
 */
function handleInputLetter(eventValue: string, eventTarget?: HTMLElement) {
  const allLetters = AppStore.getCurrentWord ? AppStore.getCurrentWord.word.split("") : [];
  const relatedLetter = allLetters.find((letter) => letter === eventValue)!;
  const currentLetter = AppStore.getCurrentWord.word.charAt(AppStore.getLetters.current);

  if (relatedLetter === currentLetter) {
    addLetterToAnswerBlock(relatedLetter);
    AppStore.nextLetter(relatedLetter);
  } else {
    blinkClass(eventTarget ?? lettersBlock, "bg-danger");
    AppStore.addMistake();
  }

  // Если больше 3 ошибок
  if (AppStore.getCurrentWord.mistakes === 3) {
    renderMistakeInQuestion();
    delay(() => finishQuestion(), 2000);
  }

  // Конец вопроса
  if (AppStore.getLetters.current === AppStore.getLetters.total) finishQuestion();
}

/**
 * @exports
 * Функция обработки клика мыши
 *
 * @param event Событие клика
 */
export function handleTrainerMouseEvent(event: MouseEvent) {
  const eventTarget = <HTMLElement>event.target;
  const eventValue = eventTarget.textContent!;

  handleInputLetter(eventValue, eventTarget);
}

/**
 * @exports
 * Функция обработки нажатия клавиши
 *
 * @param event Событие нажатия
 */
export function handleTrainerKeyboardEvent(event: KeyboardEvent) {
  const eventValue = event.key;
  const eventKeyCode = event.keyCode;
  const [from, to] = TRIGGERED_KEY_CODES;

  if (eventKeyCode && eventKeyCode >= from && eventKeyCode <= to) {
    handleInputLetter(eventValue);
  }
}
