import chalk from 'chalk';

export default class PrinterStdout2D {
  constructor(serialization) {
    this.serialization = serialization;
  }

  updateSerialization(serialization) {
    this.serialization = serialization;
  }

  render() {
    // Clearing the console
    process.stdout.write('\x1Bc'); // This works in most terminals

    this.serialization.forEach(row => {
      let rowString = '';
      row.forEach(cell => {
        rowString += cell === 1 ? chalk.green('x ') : 'o '; // Using 'chalk' for color
      });
      console.log(rowString);
    });
  }
}
