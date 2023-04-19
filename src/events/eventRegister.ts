import { handleTrainerMouseEvent, handleTrainerKeyboardEvent } from "./eventTrainer";
import { handlePositiveDisclaimerEvent, handleNegativeDisclaimerEvent } from "./eventsDisclaimer";

const lettersBlock = document.getElementById("letters")!;
const continueButton = document.getElementById("js_btn_continue");
const resetButton = document.getElementById("js_btn_reset");

lettersBlock.addEventListener("click", handleTrainerMouseEvent);
document.addEventListener("keydown", handleTrainerKeyboardEvent);

continueButton?.addEventListener("click", () => handlePositiveDisclaimerEvent());
resetButton?.addEventListener("click", () => handleNegativeDisclaimerEvent());
