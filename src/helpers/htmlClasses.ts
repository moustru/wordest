import delay from "./delay";

export function blinkClass(el: HTMLElement, className: string) {
  el.classList.add(className);

  delay(() => el.classList.remove(className), 200);
}
