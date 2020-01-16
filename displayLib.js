'use strict';

const eraseTail = function(snake) {
  const { previousTail, type } = snake.status;

  const [colId, rowId] = previousTail;
  const cell = getCell(colId, rowId);
  cell.classList.remove(type);
};

const drawSnake = function(snake) {
  const { positions, type } = snake.status;
  positions.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.add(type);
  });
};

const drawFood = function(food) {
  const [colId, rowId] = food.position;
  const cell = getCell(colId, rowId);
  cell.classList.add('food');
};

const drawScorecard = function(scorecard) {
  const scoreId = document.getElementById('score');
  scoreId.innerText = scorecard.score;
};

const moveAndDrawSnake = function(snake) {
  snake.move();
  eraseTail(snake);
  drawSnake(snake);
};

const animateSnakes = (snake, ghostSnake) => {
  moveAndDrawSnake(snake);
  moveAndDrawSnake(ghostSnake);
};

const eraseFood = function(food) {
  const [colId, rowId] = food.position;
  const cell = getCell(colId, rowId);
  cell.classList.remove('food');
};

const displayGame = function(game) {
  animateSnakes(game.snake, game.ghostSnake);
  drawFood(game.food);
  drawScorecard(game.scorecard);
};
