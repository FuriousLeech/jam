
const NULL_DELIMITER = '\x00';

class Delimiter {
  constructor(protocol) {
    /**
     * Protocol that instantiated this delimiter
     * @type {Client}
     * @private
     */
    this._protocol = protocol;

    /**
     * Packet buffer
     * @type {?string}
     * @private
     */
    this._buffer = '';
  }

  /**
   * Adds chuck of the packet data to the buffer
   * @param {number} type packet type
   * @param {string} data packet data
   * @private
   */
  chuck(type, data) {
    this._buffer += data;
    this._next(type);
  }

  /**
   * Handles the queue
   * @param {number} type packet type
   * @private
   */
  _next(type) {
    if (this._buffer[this._buffer.length - 1] === NULL_DELIMITER) {
      const packets = this._buffer.split(NULL_DELIMITER);

      for (let i = 0; i < packets.length - 1; i++) this._protocol.onPacket(type, packets[i]);
      this._buffer = '';
    }
  }
}

module.exports = Delimiter;
