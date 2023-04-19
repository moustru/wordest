import delay from "./delay";

/**
 * @exports
 * Появление/исчезание класса (в целом, создана для подсветки ошибки)
 *
 * @param el HTML-элемент
 * @param className Имя класса
 */
export function blinkClass(el: HTMLElement, className: string) {
  el.classList.add(className);

  delay(() => el.classList.remove(className), 200);
}
