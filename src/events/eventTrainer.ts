import AppStore from "@/store";
import { addLetterToAnswerBlock } from "@/ui/letters";
import { finishQuestion } from "@/ui/questions";
import { blinkClass } from "@/helpers/htmlClasses";
import { renderMistakeInQuestion } from "@/ui/mistakes";
import delay from "@/helpers/delay";

const lettersBlock = document.getElementById("letters")!;

function handleTrainerEvent(event: KeyboardEvent | MouseEvent) {
  let eventValue: string;
  let eventTarget: HTMLElement | null = null;

  switch (event.type) {
    case "keydown":
      eventValue = (<KeyboardEvent>event).key;
      break;
    case "click":
      eventTarget = <HTMLElement>event.target;
      eventValue = eventTarget.textContent!;
  }

  const allLetters = AppStore.getCurrentWord ? AppStore.getCurrentWord.word.split("") : [];
  const relatedLetter = allLetters.find((letter) => letter === eventValue);
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

export default handleTrainerEvent;
