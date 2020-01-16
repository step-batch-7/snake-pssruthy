'use strict';

const isTouchBorder = function(snake) {
  const [headX, headY] = snake.head;
  const isXCoInRange = headX > NUM_OF_COLS - 1 || headX < 0;
  const isYCoInRange = headY > NUM_OF_ROWS - 1 || headY < 0;
  return isXCoInRange || isYCoInRange;
};

class Game {
  constructor(snake, ghostSnake, food, scorecard) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.scorecard = scorecard;
  }

  hasSnakeAteFood() {
    const [headX, headY] = this.snake.head;
    const [foodX, foodY] = this.food.position;
    return headX === foodX && headY === foodY;
  }

  set newFood(food) {
    this.food = food;
  }

  get scoring() {
    return this.score;
  }

  isTouchBody() {
    const location = this.snake.location;
    const [headX, headY] = location.pop();
    return location.some(([posX, posY]) => headX === posX && headY === posY);
  }

  isOver() {
    const touchBody = this.isTouchBody();
    const touchBorder = isTouchBorder(this.snake);
    return touchBorder || touchBody;
  }

  update() {
    if (this.hasSnakeAteFood()) {
      eraseFood(this.food);
      this.snake.grow();
      this.newFood = generateFood();
      this.scorecard.update(10);
    }
  }
  turnSnake(direction) {
    this.snake.turnSnake(direction);
  }
}
