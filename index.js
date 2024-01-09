import Cell from './src/cell.js';
import Game from './src/game.js';
import Manager from './src/manager.js';
import PrinterStdout2D from './src/printer2D.js';
import RulesEvaluator2D from './src/rulesEvaluator2D.js';

// Initial configuration
const fiveZerosRow = Array(5).fill(0);
const sixZerosRow = Array(6).fill(0);
const beacon1 = [0, 1, 1, 0, 0, 0];
const beacon2 = [0, 0, 0, 1, 1, 0];
const middleRow = [0, 1, 1, 1, 0];
const blinkerBoard = [fiveZerosRow, fiveZerosRow, middleRow, fiveZerosRow, fiveZerosRow];
const beaconBoard = [sixZerosRow, beacon1, beacon1, beacon2, beacon2, sixZerosRow];

const initConfig = beaconBoard;

const rules = [
  (alive, neighborsAlive) => alive && neighborsAlive < 2 ? false : false,
  (alive, neighborsAlive) => alive && (neighborsAlive === 2  || neighborsAlive === 3),
  (alive, neighborsAlive) => alive && neighborsAlive > 3 ? false : false,
  (alive, neighborsAlive) => !alive && neighborsAlive === 3
];

// Instantiating the classes
const evaluator = new RulesEvaluator2D({
  rules: rules,
  currentGen: initConfig,
  cellClass: Cell
});

const printer = new PrinterStdout2D(initConfig);
const manager = new Manager({
  refreshRate: 0.5, // Refresh rate in seconds
  initConfig: initConfig,
  printer: printer
});

const game = new Game({
  manager: manager,
  evaluator: evaluator
});

// Starting the game
game.start();

