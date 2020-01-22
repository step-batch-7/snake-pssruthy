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

const handleKeyPress = game => {
  const playerDir = event.key;
  const snakeDir = {
    ArrowRight: 0,
    ArrowUp: 1,
    ArrowLeft: 2,
    ArrowDown: 3
  };
  if (Object.keys(snakeDir).includes(playerDir)) {
    game.turnSnake(snakeDir[playerDir]);
  }
};

const attachEventListeners = game => {
  document.body.onkeydown = handleKeyPress.bind(null, game);
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

  const { snake, ghostSnake, scorecard } = game.status;
  drawSnake(snake);
  drawSnake(ghostSnake);
  drawScorecard(scorecard);
};

const randomlyTurnSnake = snake => {
  const direction = Math.floor((Math.random() * 100) % 4);
  snake.turnSnake(direction);
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
  const { food, ghostSnake } = game.status;
  drawFood(food);

  const ghostInt = setInterval(randomlyTurnSnake, 500, ghostSnake);
  const updateInterval = setInterval(() => {
    game.update();
    if (game.isOver()) {
      clearInterval(updateInterval);
      clearInterval(ghostInt);
      gameEnd(game);
    }
    displayGame(game);
  }, 200);
};
