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

  isOver() {
    const location = this.snake.location;
    const [headX, headY] = location.pop();
    return location.some(([posX, posY]) => headX === posX && headY === posY);
  }
}
