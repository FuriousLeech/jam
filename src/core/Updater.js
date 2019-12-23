const { version } = require('../package.json');
const { notify } = require('../util');
const logger = require('../logger');
const semver = require('semver');
const axios = require('axios');
const opn = require('opn');

class Updater {
  constructor() {
    throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
  }

  /**
   * Host endpoint
   * @type {string}
   * @readonly
   * @static
   */
  static get baseUrl() {
    return 'https://api.github.com';
  }

  /**
   * Checks for an update
   * @static
   */
  static async checkForNewRelease() {
    logger.info('Checking for updates...');

    try {
      const { data } = await axios.get(`${this.baseUrl}/repos/zaneslick/jam/releases/latest`);

      const latestVersion = data.tag_name;
      const page = data.html_url;

      if (semver.lt(version, latestVersion)) this._notifyAndOpen(page);
    } catch (error) {
      // Unable to fetch information
    }
  }

  /**
   * Sends a desktop notifcation and opens the release page
   * @param {strng} page Page to open
   * @returns {NodeNotifier}
   * @private
   */
  static _notifyAndOpen(page) {
    return notify({
      title: 'New Update available!',
      message: 'Jam updates, click me!',
      wait: true,
    }).on('click', () => opn(page));
  }
}

module.exports = Updater;
