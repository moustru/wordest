import Letter from "@/components/Letter";
import AppStore from "@/store";

const lettersBlock = document.getElementById("letters")!;
const answerBlock = document.getElementById("answer")!;

/**
 * Рендеринг букв
 *
 * @param lettersArray Массив букв
 * @param parentBlock Родительский элемент, где будет происходить рендер
 * @param bgClass Класс для цвета бэкграунда букв (необязательный аргумент)
 */
function renderLetters(lettersArray: string[], parentBlock: HTMLElement, bgClass?: string) {
  lettersArray.forEach((letter) => {
    const newLetter = new Letter(letter);

    parentBlock?.appendChild(newLetter.render(bgClass));
  });
}

/**
 * Функция пометки всех букв как неправильных
 */
function markAllLettersAsWrong() {
  [...answerBlock.children].forEach((letterEl) => letterEl.classList.add("bg-danger"));
}

/**
 * @exports
 * Рендеринг букв в рабочую область
 *
 * @param lettersArray Массив букв
 */
export function renderLettersBlock(lettersArray: string[]) {
  lettersBlock!.innerHTML = "";

  renderLetters(lettersArray, lettersBlock);
}

/**
 * @exports
 * Рендеринг букв в блок ответа
 */
export function renderAnswerBlock() {
  const renderedData = AppStore.getCurrentWord.word
    .slice(0, AppStore.getCurrentWord.currentLetter)
    .split("");

  renderLetters(renderedData, answerBlock, "bg-success");
}

/**
 * @exports
 * Функция добавления буквы в блок ответа (одиночно)
 *
 * @param addedLetter Добавляемый литерал буквы
 * @param isWrong Флаг, показывающий, добавляется ли буква вследствие превышения лимита ошибок (в таком случае все буквы надо красить в красный цвет)
 */
export function addLetterToAnswerBlock(addedLetter: string, isWrong?: boolean) {
  const letterNode = [...lettersBlock.children].find((child) => child.textContent === addedLetter)!;

  lettersBlock!.removeChild(letterNode);

  const appendTarget = answerBlock.appendChild(letterNode);
  appendTarget.classList.remove("bg-primary");

  if (!isWrong) {
    appendTarget.classList.add("bg-success");
  } else {
    markAllLettersAsWrong();
  }
}
