/**
 * @class
 * Класс-компонент сущности буквы в слове. Необходим для UI
 */
class Letter {
  letter: string;

  constructor(letter: string) {
    this.letter = letter;
  }

  /**
   * Функция запуска рендера
   *
   * @param bgClass Опциональный класс, который заменяет bg-primary
   * @returns HTML-элемент буквы
   */
  render(bgClass?: string): HTMLDivElement {
    const letterDiv = document.createElement("div");

    letterDiv.classList.add("letter");
    letterDiv.classList.add(bgClass ?? "bg-primary");
    letterDiv.textContent = this.letter;

    return letterDiv;
  }
}

export default Letter;
