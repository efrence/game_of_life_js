export default class RulesEvaluator2D {
  constructor({ rules, currentGen, cellClass }) {
    this.rules = rules;
    this.currentGen = currentGen;
    this.cellClass = cellClass;
  }

  evaluate(currentGen) {
    let newGen = [];
    let someAlive = false;

    const counts = this.aliveCounts()
    for (let i = 0; i < this.numRows(); i++) {
      newGen[i] = [];
      for (let j = 0; j < this.numCols(); j++) {
        const cell = new this.cellClass(this.rules, currentGen[i][j], counts[i][j]);
        const alive = cell.nextState()
        if(alive){
          someAlive = true;
        }
        newGen[i][j] = alive;
      }
    }
    if(!someAlive){
      throw 'game ended';
    }

    return newGen;
  }

  aliveCounts() {
    let counts = Array.from({ length: this.numRows() }, () => Array(this.numCols()).fill(0));

    this.alivePositions().forEach(([row, col]) => {
      for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
          if (i >= 0 && i < this.numRows() && j >= 0 && j < this.numCols()) {
            counts[i][j]++;
          }
        }
      }
      counts[row][col] -= this.currentGen[row][col];
    });

    return counts;
  }

  alivePositions() {
    let positions = [];
    for (let i = 0; i < this.numRows(); i++) {
      for (let j = 0; j < this.numCols(); j++) {
        if (this.currentGen[i][j] === 1) {
          positions.push([i, j]);
        }
      }
    }
    return positions;
  }

  numCols() {
    return this.currentGen[0].length;
  }

  numRows() {
    return this.currentGen.length;
  }
}

