class Snake {
  #positions;
  #direction;
  #type;
  #previousTail;
  constructor(positions, direction, type) {
    this.#positions = positions.slice();
    this.#direction = direction;
    this.#type = type;
    this.#previousTail = [0, 0];
  }

  get location() {
    return this.#positions.slice();
  }

  get head() {
    return this.#positions[this.#positions.length - 1];
  }

  move() {
    const [headX, headY] = this.#positions[this.#positions.length - 1];
    this.#previousTail = this.#positions.shift();
    const [deltaX, deltaY] = this.#direction.delta;
    this.#positions.push([headX + deltaX, headY + deltaY]);
  }
  grow() {
    this.#positions.unshift(this.#previousTail);
  }

  turnSnake(playerDir) {
    if (!this.#direction.isSameOrOppositeDirection(playerDir)) {
      this.#direction.turn(playerDir);
    }
  }

  get status() {
    const positions = this.#positions;
    const direction = this.#direction;
    const type = this.#type;
    const previousTail = this.#previousTail;
    return { positions, direction, type, previousTail };
  }
}
