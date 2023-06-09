import AppStore from "@/store";
import { renderAnswerBlock, renderLettersBlock } from "./letters";
import { showStats } from "./additionalScreens";
import delay from "@/helpers/delay";

const answerBlock = document.getElementById("answer");
const currentQuestion = document.getElementById("current_question");
const totalQuestions = document.getElementById("total_questions");

/**
 * Рендеринг счетчика вопросов
 *
 * @param current Номер текущего вопроса
 * @param total Кол-во вопросов
 */
function renderQuestionPanel(current: number, total: number) {
  currentQuestion!.textContent = String(++current);
  totalQuestions!.textContent = String(++total);
}

/**
 * Рендеринг счетчика вопросов и блока с буквами (без связи с AppStore, абсолютный UI)
 *
 * @param lettersArray Массив букв
 * @param currentQuestion Номер текущего вопроса
 * @param totalQuestion Кол-во вопросов
 */
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
  renderLettersBlock(lettersArray);
}

/**
 * @exports
 * Загрузка вопроса (рендеринг + манипуляция данных)
 */
export function loadQuestion() {
  AppStore.setLetterTotalCounter(AppStore.getCurrentWord.word.length);

  renderQuestion({
    lettersArray: AppStore.getCurrentWord.shuffled,
    currentQuestion: AppStore.getQuestions.current,
    totalQuestion: AppStore.getQuestions.total!
  });

  renderAnswerBlock();
}

/**
 * @exports
 * Обработка конца вопроса
 */
export function finishQuestion() {
  AppStore.finishQuestion();
  AppStore.nextQuestion();

  const currentQuestion = AppStore.getQuestions.current;
  const totalQuestions = AppStore.getQuestions.total!;

  currentQuestion <= totalQuestions ? delay(() => loadQuestion()) : delay(() => showStats());
}
