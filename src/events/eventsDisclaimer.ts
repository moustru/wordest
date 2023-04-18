import AppStore from "@/store";
import { hideDisclaimer } from "@/ui/additionalScreens";
import { loadQuestion } from "@/ui/questions";

function hideAndLoad() {
  hideDisclaimer();
  loadQuestion();
}

export function handlePositiveDisclaimerEvent() {
  hideAndLoad();
}

export function handleNegativeDisclaimerEvent() {
  AppStore.resetStorage();
  hideAndLoad();
}
