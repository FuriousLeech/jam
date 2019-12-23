const { EventEmitter } = require('events');
const { createServer } = require('net');
const { EVENTS } = require('../util/Constants');
const PluginManager = require('../plugin/PluginManager');
const { PromiseSocket } = require('promise-socket');
const logger = require('../logger');
const Client = require('./Client');

class TCPServer extends EventEmitter {
  constructor(server) {
    super();

    Object.assign(this, server);

    /**
     * Server connection
     * @type {?net.Socket}
     * @private
     */
    this._server = null;

    /**
     * Plugin manager
     * @type {PluginManager}
     * @public
     */
    this.plugins = new PluginManager(this);
    this.plugins.loadAll();

    /**
     * The connected client
     * @type {Client}
     * @private
     */
    this._client = null;

    /**
     * Handles the process events
     */
    process.on('message', this._onProcess.bind(this));
  }

  get logger() {
    return logger;
  }

  /**
   * Spawns the server and gets the information from the configuration file
   * @param {Array} servers Servers to spawn
   * @returns {TCPServer}
   * @static
   */
  static async spawn() {
    const server = Config.get('jam');
    const tcpServer = new TCPServer(server);
    await tcpServer.listen();
    return this;
  }

  /**
   * Create socket and begin listening for new connections
   * @returns {Promise<void>}
   * @public
   */
  listen() {
    return new Promise((resolve, reject) => {
      if (this._server) reject(new Error('The server has already been instantiated.'));

      this._server = createServer(socket => this._onConnection(socket))
        .once('listening', () => resolve())
        .once('error', error => reject(error));

      this._server.listen(this.port);
    });
  }

  /**
   * Handles the process events
   * @param {Object} data The incoming data to handle
   * @private
   */
  _onProcess(data) {
    switch (data.messageType) {
      case 'packet': {
        const packet = data.packet;
        const type = data.type;

        if (type === 'local') {
          this._client.localWrite(packet);
        } else {
          this._client.remoteWrite(packet);
        }
        break;
      }

      case 'game:command': {
        const command = data.command;
        const params = data.params;

        const cmd = this.plugins.commands.get(command);
        if (cmd) cmd.execute({ client: this._client, params });
      }
    }
  }

  /**
   * Handles new incoming connections
   * @param {net.Socket} socket Connection socket
   */
  async _onConnection(socket) {
    socket = new PromiseSocket(socket);

    this._client = new Client(this, socket);
    await this._client.connect();

    this.emit(EVENTS.NEW_CONNECTION, this._client);
  }

  /**
   * Removes the client from the connections map
   * @param {Client} client Client to remove
   */
  removeConnection(client) {
    this._client = null;
    this.emit(EVENTS.CONNECTION_REMOVED, client);
  }
}

module.exports = TCPServer;
