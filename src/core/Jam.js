const Server = require('../network/Server');
const logger = require('../logger');
const Config = require('../config');
const Plugin = require('../plugin');
const chalk = require('chalk');

/**
 * Config
 */
Config.load()
  .then(() => {
    global.Config = Config;
    global.Plugin = Plugin;
  })
  .then(() => Server.spawn())
  .then(() => logger.info('Successfully initialized!'))
  .then(() => logger.info(chalk.red('http://localhost for the web interface!')))
  .catch(error => logger.error(`Failed to spawn servers.. Reason: ${error.message}`));
