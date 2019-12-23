const childProcess = require('child_process');
const { EventEmitter } = require('events');

class Process extends EventEmitter {
  constructor(file) {
    super();

    /**
     * File path of the spawner
     * @type {string}
     * @private
     */
    this._file = file;

    /**
     * Process of the server
     * @type {?childProcess}
     * @private
     */
    this._process = null;
  }

  /**
   * Forks a child process
   * @returns {Promise<void>}
   */
  spawn() {
    return new Promise((resolve, reject) => {
      if (this._process) reject(new Error('Process already exsists.'));

      this._process = childProcess.fork(this._file)
        .on('message', message => this.emit('message', message))
        .once('error', error => reject(error));
      resolve();
    });
  }

  /**
   * Sends data to the child process
   * @param {Object} data Data to send
   * @returns {Promise<void>}
   * @public
   */
  send(data = {}) {
    return new Promise((resolve, reject) => {
      this._process.send(data, error => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
}

module.exports = Process;
