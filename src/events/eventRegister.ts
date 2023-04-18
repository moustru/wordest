import handleEvent from "./eventTrainer";
import { handlePositiveDisclaimerEvent, handleNegativeDisclaimerEvent } from "./eventsDisclaimer";

const lettersBlock = document.getElementById("letters")!;
const continueButton = document.getElementById("js_btn_continue");
const resetButton = document.getElementById("js_btn_reset");

lettersBlock.addEventListener("click", handleEvent);
document.addEventListener("keydown", handleEvent);

continueButton?.addEventListener("click", () => handlePositiveDisclaimerEvent());
resetButton?.addEventListener("click", () => handleNegativeDisclaimerEvent());
