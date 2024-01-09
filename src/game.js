export default class Game {
  constructor({ manager, evaluator }) {
    this.manager = manager;
    this.evaluator = evaluator;
  }

  async start() {
    while (true) {
      try {
        const nextGen = await this.manager.iterate(this.evaluator);
        this.evaluator = new this.evaluator.constructor({
          rules: this.evaluator.rules,
          currentGen: nextGen,
          cellClass: this.evaluator.cellClass
        });
      } catch (error) {
        console.error('Error in game loop:', error);
        break;
      }
    }
  }
}
