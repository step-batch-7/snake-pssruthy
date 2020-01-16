'use strict';

const eraseTail = function(snake) {
  let [colId, rowId] = snake.previousTail;
  const cell = getCell(colId, rowId);
  cell.classList.remove(snake.species);
};

const drawSnake = function(snake) {
  snake.location.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.add(snake.species);
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
