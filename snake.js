'use strict';

const EAST = 0;
const NORTH = 1;
const WEST = 2;
const SOUTH = 3;

class Direction {
  constructor(initialHeading) {
    this.heading = initialHeading;
    this.deltas = {};
    this.deltas[EAST] = [1, 0];
    this.deltas[WEST] = [-1, 0];
    this.deltas[NORTH] = [0, -1];
    this.deltas[SOUTH] = [0, 1];
  }

  get delta() {
    return this.deltas[this.heading];
  }

  turnLeft() {
    this.heading = (this.heading + 1) % 4;
  }
}

class Snake {
  constructor(positions, direction, type) {
    this.positions = positions.slice();
    this.direction = direction;
    this.type = type;
    this.previousTail = [0, 0];
  }

  get location() {
    return this.positions.slice();
  }

  get species() {
    return this.type;
  }

  get head() {
    return this.positions[this.positions.length - 1];
  }

  turnLeft() {
    this.direction.turnLeft();
  }

  move() {
    const [headX, headY] = this.positions[this.positions.length - 1];
    this.previousTail = this.positions.shift();

    const [deltaX, deltaY] = this.direction.delta;

    this.positions.push([headX + deltaX, headY + deltaY]);
  }

  grow() {
    this.positions.unshift(this.previousTail);
  }
}

class Food {
  constructor(colId, rowId) {
    this.colId = colId;
    this.rowId = rowId;
  }

  get position() {
    return [this.colId, this.rowId];
  }
}

class Game {
  constructor(snake, ghostSnake, food) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
  }

  hasSnakeAteFood() {
    const [headX, headY] = this.snake.head;
    const [foodX, foodY] = this.food.position;
    return headX === foodX && headY === foodY;
  }

  set newFood(food) {
    this.food = food;
  }
}

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

const handleKeyPress = snake => {
  snake.turnLeft();
};

const moveAndDrawSnake = function(snake) {
  snake.move();
  eraseTail(snake);
  drawSnake(snake);
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
};

const animateSnakes = (snake, ghostSnake) => {
  moveAndDrawSnake(snake);
  moveAndDrawSnake(ghostSnake);
};

const randomlyTurnSnake = snake => {
  let x = Math.random() * 100;
  if (x > 50) {
    snake.turnLeft();
  }
};
const eraseFood = function(food) {
  const [colId, rowId] = food.position;
  const cell = getCell(colId, rowId);
  cell.classList.remove('food');
};

const generateFood = () => {
  const foodX = Math.round(Math.random() * NUM_OF_COLS);
  const foodY = Math.round(Math.random() * NUM_OF_ROWS);

  return new Food(foodX, foodY);
};

const updateGame = function(game) {
  animateSnakes(game.snake, game.ghostSnake);
  drawFood(game.food);

  if (game.hasSnakeAteFood()) {
    eraseFood(game.food);
    game.snake.grow();
    game.newFood = generateFood();
  }
};

const main = function() {
  const snake = initSnake();
  const ghostSnake = initGhostSnake();
  const food = generateFood();

  const game = new Game(snake, ghostSnake, food);
  setup(game);
  drawFood(game.food);

  setInterval(updateGame, 200, game);
  setInterval(randomlyTurnSnake, 500, game.ghostSnake);
};
