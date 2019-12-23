const chalk = require('chalk');
const notifier = require('node-notifier');
const path = require('path');

class Util {
  constructor() {
    throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
  }

  /**
   * Prints moon ascii art to the console
   * @static
   */
  static dumpAsciiLogo() {
    // eslint-disable-next-line no-console
    console.log(chalk.red([
      '',
      '               -:://::-     ',
      '               -//++++//-    ',
      '              `:/++++++/:    ',
      '             `::-            ',
      '             .ooo+-    ./o`  ',
      '              oooooo+/+ooo   ',
      '              /oooooooooo/   ',
      '              :oooooooooo-   ',
      '               `-::::::.` ',
      '',
    ].join('\n')), `\n  ${chalk.white('Looking for nothing but competition.')} \n`);
  }

  /**
   * Desktop notifcation
   * @param {Object} options Notify options
   * @returns {NodeNotifier}
   */
  static notify(options = {}) {
    return notifier.notify({
      icon: path.join(__dirname, '..', '..', 'assets', 'icon.png'),
      ...options,
    });
  }
}

module.exports = Util;

