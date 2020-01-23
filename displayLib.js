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
  eraseFood();
  const [colId, rowId] = food.position;
  const cell = getCell(colId, rowId);
  cell.classList.add(food.type);
};

const drawScorecard = function(scorecard) {
  const { score } = scorecard.status;
  const scoreId = document.getElementById('score');
  scoreId.innerText = score;
};

const moveAndDrawSnake = function(snake) {
  eraseTail(snake);
  drawSnake(snake);
};

const animateSnakes = (snake, ghostSnake) => {
  moveAndDrawSnake(snake);
  moveAndDrawSnake(ghostSnake);
};

const eraseFood = function() {
  const prevFood = document.querySelector('.specialFood, .normalFood');
  if(prevFood) {
    prevFood.classList.remove(prevFood.classList[1]);
  }
};

const displayGame = function(game) {
  const { snake, ghostSnake, food, scorecard } = game.status;
  animateSnakes(snake, ghostSnake);
  drawFood(food);
  drawScorecard(scorecard);
};
