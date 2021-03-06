class Direction {
  #heading;
  #deltas;
  constructor(initialHeading) {
    this.#heading = initialHeading;
    this.#deltas = {};
    this.#deltas[EAST] = [1, 0];
    this.#deltas[WEST] = [-1, 0];
    this.#deltas[NORTH] = [0, -1];
    this.#deltas[SOUTH] = [0, 1];
  }
  get delta() {
    return this.#deltas[this.#heading];
  }
  turn(direction) {
    this.#heading = direction;
  }
  isSameOrOppositeDirection(direction) {
    return this.#heading % 2 === direction % 2;
  }
}
