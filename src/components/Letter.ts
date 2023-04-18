class Letter {
  letter: string;

  constructor(letter: string) {
    this.letter = letter;
  }

  render(bgClass?: string) {
    const letterDiv = document.createElement("div");

    letterDiv.classList.add("letter");
    letterDiv.classList.add(bgClass ?? "bg-primary");
    letterDiv.textContent = this.letter;

    return letterDiv;
  }
}

export default Letter;
