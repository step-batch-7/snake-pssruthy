class Scorecard {
  #score;
  constructor() {
    this.#score = 0;
  }
  get status() {
    const score = this.#score;
    return { score };
  }
  update(score) {
    this.#score += score;
  }
}
