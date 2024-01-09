export default class Cell {
  constructor(rules, state, neighborsAlive) {
    this.state = parseInt(state, 10);
    this.neighborsAlive = parseInt(neighborsAlive, 10);
    this.rules = rules;
  }

  evaluateRules() {
    this.nextGenState = false;
    this.rules.forEach(rule => {
      this.nextGenState = this.nextGenState || rule(!(this.state === 0), this.neighborsAlive);
    });
    return this.nextGenState;
  }

  nextState() {
    this.evaluateRules();
    return this.nextGenState ? 1 : 0;
  }
}

