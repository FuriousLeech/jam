const { CONNECTION_STATE } = require('../util/Constants');
const AnimalJam = require('./protocol/AnimalJam');
const { PromiseSocket } = require('promise-socket');
const Packet = require('./protocol/packets');
const Player = require('../game/Player');
const State = require('../game/State');

class Client {
  constructor(server, socket) {
    /**
     * Server that instantiated this client
     * @type {TCPServer}
     * @public
     */
    this.server = server;

    /**
     * Socket that instantiated this client
     * @type {net.Socket}
     * @public
     */
    this.socket = socket;

    /**
     * Remote connection
     * @type {?net.Socket}
     * @private
     */
    this.remote = null;

    /**
     * Connection state
     * @type {number}
     * @public
     */
    this.connectionState = CONNECTION_STATE.IDLE;

    /**
     * Network protocol
     * @type {AnimalJam}
     * @public
     */
    this.protocol = new AnimalJam(this);

    /**
     * Intervals set
     * @type {Set<Timeout>}
     * @private
     */
    this._intervals = new Set();

    /**
     * Client state store
     * @type {State}
     * @public
     */
    this.state = new State();

    /**
     * Player of this client
     * @type {?Player}
     * @public
     */
    this.player = null;
  }

  /**
   * Creates a new player instance
   * @param {Object} information Information of the player
   * @param {string} token Authentication token of the player
   */
  constructPlayer(information) {
    if (this.player === null) this.player = new Player(this, information);
  }

  /**
   * Initialize the socket events
   * @private
   */
  _init() {
    this.socket.stream.on('data', data => this.protocol.localDelimiter.chuck(this.protocol.type.LOCAL, data));
    this.socket.stream.once('close', () => this.disconnect());
  }

  /**
   * Attempts connection to the remote host
   * @returns {Promise<void>}
   */
  async connect() {
    try {
      this.remote = new PromiseSocket();

      const { host, port } = this.server.remote;
      await this.remote.connect({ host, port });
      this.connectionState = CONNECTION_STATE.CONNECTED;

      this._init();
      this.remote.stream.on('data', data => this.protocol.remoteDelimiter.chuck(this.protocol.type.REMOTE, data));
      this.remote.stream.once('close', () => this.disconnect());
    } catch (error) {
      this.server.logger.error(`Failed connecting to the remote host.. Reason: ${error.message}`);
    }
  }


  /**
   * Sends the packet to the server
   * @param {Packet} packet Packet to send
   * @returns {Promise<void>}
   * @public
   */
  async remoteWrite(packet) {
    if (this.connectionState === CONNECTION_STATE.CONNECTED) {
      try {
        let toPacket = packet instanceof Packet ? packet.toPacket() : packet;
        if (typeof toPacket === 'object') toPacket = JSON.stringify(toPacket);

        process.send({ type: 'packet', packet: toPacket, packetType: 'remote' });
        await this.remote.write(`${toPacket}\x00`);
      } catch (error) {
        this.server.logger.error(`Remote send failed! Reason: ${error.message}`, { server: this.server.name });
      }
    }
  }

  /**
   * Sends the packet to the server
   * @param {Packet} packet Packet to send
   * @returns {Promise<void>}
   * @public
   */
  async localWrite(packet) {
    if (this.connectionState === CONNECTION_STATE.CONNECTED) {
      try {
        let toPacket = packet instanceof Packet ? packet.toPacket() : packet;
        if (typeof toPacket === 'object') toPacket = JSON.stringify(toPacket);

        process.send({ type: 'packet', packet: toPacket, packetType: 'local' });
        await this.socket.write(`${toPacket}\x00`);
      } catch (error) {
        this.server.logger.error(`Local send failed! Reason: ${error.message}`, { server: this.server.name });
      }
    }
  }

  /**
   * Displays a server admin message
   * @param {string} text The text to send
   * @returns {Promise<void>}
   * @public
   */
  serverMessage(text) {
    return this.localWrite(`%xt%ua%${text}%0%`);
  }


  /**
   * Sets an interval
   * @param {Function} fn Function to execute
   * @param {*} delay Time to wait between executions
   * @param  {...any} args Arguments for the function
   * @returns {Timeout}
   */
  setInterval(fn, delay, ...args) {
    const interval = setInterval(fn, delay, ...args);
    this._intervals.add(interval);
    return interval;
  }

  /**
   * Clears an interval
   * @param {Timeout} interval Interval to cancel
   * @public
   */
  clearInterval(interval) {
    clearInterval(interval);
    this._intervals.clear(interval);
  }

  /**
   * Handles disconnection
   * @public
   */
  async disconnect() {
    if (this.connectionState === CONNECTION_STATE.CONNECTED) {
      this.connectionState = CONNECTION_STATE.DISCONNECTED;
      await this.remote.end();
      await this.socket.end();
      this._destroy();
      this.server.removeConnection(this);
    }
  }

  /**
   * Distorys the sockets
   * @returns {Promise<void>}
   * @private
   */
  async _destroy() {
    await this.remote.destroy();
    await this.socket.destroy();

    for (const interval of this._intervals) this.clearInterval(interval);
    this._intervals.clear();
  }
}

module.exports = Client;
