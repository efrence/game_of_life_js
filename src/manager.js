export default class Manager {
  constructor({ refreshRate, initConfig, printer }) {
    this.nextGen = initConfig;
    this.refreshRate = refreshRate;
    this.printer = printer;
  }

  iterate(evaluator) {
    return new Promise(resolve => {
      this.printer.render();
      this.nextGen = evaluator.evaluate(this.nextGen);
      setTimeout(() => {
        this.printer.updateSerialization(this.nextGen);
        resolve(this.nextGen);
      }, this.refreshRate * 1000); // Convert seconds to milliseconds
    });
  }
}

