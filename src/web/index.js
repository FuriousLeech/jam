const express = require('express');
const logger = require('../logger');
const path = require('path');

/**
 * Express instance
 */
const app = express();

/**
 * Settings
 */
app.set('views', path.join(__dirname, '.', 'resources/views'));
app.set('view engine', 'ejs');

/**
 * Middleware
 */
app.use(express.static(path.join(__dirname, '.', 'public')));

/**
 * Express listen
 * @param {string} port Server listen port
 * @returns {Promise<void>}
 */
module.exports = port => new Promise(resolve => {
  app.listen(port, () => {
    logger.info(`Jam web listening on ::${port}`);
    resolve();
  });
});
