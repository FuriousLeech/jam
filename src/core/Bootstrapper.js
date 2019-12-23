const WebSocketServer = require('../web/ws');
const Process = require('./Process');
const Config = require('../config');
const express = require('../web');
const logger = require('../logger');
const path = require('path');

class Bootstrapper {
  /**
   * Setup jam
   * @static
   */
  static async setup() {
    logger.info('Setting up Jam..');

    this.process = new Process(path.join(__dirname, '.', 'Jam.js'));
    this.ws = new WebSocketServer(this.process);

    try {
      await Config.load();

      const { port } = Config.get('web');
      await express(port);

      await this.ws.serve();
      await this.process.spawn();
    } catch (error) {
      logger.info(`Failed Initializing! Reason: ${error.message}`);
    }
  }
}

module.exports = Bootstrapper;

