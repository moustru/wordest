import Letter from "@/components/Letter";
import AppStore from "@/store";

const lettersBlock = document.getElementById("letters")!;
const answerBlock = document.getElementById("answer")!;

export function renderLetters(lettersArray: string[], bgClass?: string) {
  lettersBlock!.innerHTML = "";

  lettersArray.forEach((letter) => {
    const newLetter = new Letter(letter);

    lettersBlock?.appendChild(newLetter.render());
  });

  if (bgClass) {
    const allLetters = [...document.querySelectorAll("#letters .letter")];

    allLetters.forEach((letter) => letter.classList.add(bgClass));
  }
}

export function renderAnswerBlock() {
  const renderedData = AppStore.getCurrentWord.word.slice(0, AppStore.getLetters.current).split("");

  renderedData.forEach((renderedLetter) => {
    const newLetter = new Letter(renderedLetter);

    answerBlock.appendChild(newLetter.render("bg-success"));
  });
}

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

export function markAllLettersAsWrong() {
  [...answerBlock.children].forEach((letterEl) => letterEl.classList.add("bg-danger"));
}
