'use strict';

const EAST = 0;
const NORTH = 1;
const WEST = 2;
const SOUTH = 3;

const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;

const GRID_ID = 'grid';

const getGrid = () => document.getElementById(GRID_ID);
const getCellId = (colId, rowId) => colId + '_' + rowId;

const getCell = (colId, rowId) =>
  document.getElementById(getCellId(colId, rowId));

const createCell = function(grid, colId, rowId) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.id = getCellId(colId, rowId);
  grid.appendChild(cell);
};

const createGrids = function() {
  const grid = getGrid();
  for (let y = 0; y < NUM_OF_ROWS; y++) {
    for (let x = 0; x < NUM_OF_COLS; x++) {
      createCell(grid, x, y);
    }
  }
};

const handleKeyPress = snake => {
  snake.turnLeft();
};

const attachEventListeners = game => {
  document.body.onkeydown = handleKeyPress.bind(null, game.snake);
};

const initSnake = () => {
  const snakePosition = [
    [40, 25],
    [41, 25],
    [42, 25]
  ];
  return new Snake(snakePosition, new Direction(EAST), 'snake');
};

const initGhostSnake = () => {
  const ghostSnakePosition = [
    [40, 30],
    [41, 30],
    [42, 30]
  ];
  return new Snake(ghostSnakePosition, new Direction(SOUTH), 'ghost');
};

const setup = game => {
  attachEventListeners(game);
  createGrids();

  drawSnake(game.snake);
  drawSnake(game.ghostSnake);
  drawScorecard(game.scorecard);
};

const randomlyTurnSnake = snake => {
  let x = Math.random() * 100;
  if (x > 50) {
    snake.turnLeft();
  }
};

const generateFood = () => {
  const foodX = Math.round(Math.random() * NUM_OF_COLS);
  const foodY = Math.round(Math.random() * NUM_OF_ROWS);

  return new Food(foodX, foodY);
};

const gameEnd = function() {
  const end = document.getElementById('gameOver');
  const grid = document.getElementById('grid');

  end.style.display = 'block';
  grid.style.display = 'none';
};

const initGame = function() {
  const snake = initSnake();
  const ghostSnake = initGhostSnake();
  const food = generateFood();
  const scorecard = new Scorecard();

  return new Game(snake, ghostSnake, food, scorecard);
};

const main = function() {
  const game = initGame();
  setup(game);
  drawFood(game.food);

  setInterval(randomlyTurnSnake, 500, game.ghostSnake);
  const updateInterval = setInterval(() => {
    if (game.isOver()) {
      clearInterval(updateInterval);
      gameEnd(game);
    }
    displayGame(game);
    game.update();
  }, 200);
};
