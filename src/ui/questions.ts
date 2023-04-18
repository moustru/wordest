import AppStore from "@/store";
import { renderAnswerBlock, renderLetters } from "./letters";
import { showStats } from "./additionalScreens";
import delay from "@/helpers/delay";

const answerBlock = document.getElementById("answer");
const currentQuestion = document.getElementById("current_question");
const totalQuestions = document.getElementById("total_questions");

function renderQuestionPanel(current: number, total: number) {
  currentQuestion!.textContent = String(++current);
  totalQuestions!.textContent = String(++total);
}

function renderQuestion({
  lettersArray,
  currentQuestion,
  totalQuestion
}: {
  lettersArray: string[];
  currentQuestion: number;
  totalQuestion: number;
}) {
  answerBlock!.innerHTML = "";

  renderQuestionPanel(currentQuestion, totalQuestion);
  renderLetters(lettersArray);
}

export function loadQuestion() {
  AppStore.setLetterTotalCounter(AppStore.getCurrentWord.word.length);

  renderQuestion({
    lettersArray: AppStore.getCurrentWord.shuffled,
    currentQuestion: AppStore.getQuestions.current,
    totalQuestion: AppStore.getQuestions.total!
  });

  renderAnswerBlock();
}

export function finishQuestion() {
  AppStore.nextQuestion();

  const currentQuestion = AppStore.getQuestions.current;
  const totalQuestions = AppStore.getQuestions.total!;

  currentQuestion <= totalQuestions ? delay(() => loadQuestion()) : delay(() => showStats());
}
