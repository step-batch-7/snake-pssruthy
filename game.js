'use strict';

const isTouchBorder = function(snake) {
  const [headX, headY] = snake.head;
  const isXCoNotInRange = headX >= NUM_OF_COLS || headX < 0;
  const isYCoNotInRange = headY >= NUM_OF_ROWS || headY < 0;
  return isXCoNotInRange || isYCoNotInRange;
};

class Game {
  #snake;
  #ghostSnake;
  #food;
  #scorecard;

  constructor(snake, ghostSnake, food, scorecard) {
    this.#snake = snake;
    this.#ghostSnake = ghostSnake;
    this.#food = food;
    this.#scorecard = scorecard;
  }

  hasSnakeAteFood() {
    const [headX, headY] = this.#snake.head;
    const [foodX, foodY] = this.#food.position;
    return headX === foodX && headY === foodY;
  }

  set newFood(food) {
    this.#food = food;
  }

  get scoring() {
    return this.#scorecard;
  }

  isTouchBody() {
    const location = this.#snake.location;
    const [headX, headY] = location.pop();
    return location.some(([posX, posY]) => headX === posX && headY === posY);
  }

  isOver() {
    const touchBody = this.isTouchBody();
    const touchBorder = isTouchBorder(this.#snake);
    return touchBorder || touchBody;
  }

  update() {
    this.#snake.move();
    this.#ghostSnake.move();
    if (this.hasSnakeAteFood()) {
      eraseFood(this.#food);
      this.#snake.grow();
      this.newFood = generateFood();
      this.#scorecard.update(10);
    }
  }
  turnSnake(direction) {
    this.#snake.turnSnake(direction);
  }
  get status() {
    const snake = this.#snake;
    const ghostSnake = this.#ghostSnake;
    const food = this.#food;
    const scorecard = this.#scorecard;

    return { snake, ghostSnake, food, scorecard };
  }
}
