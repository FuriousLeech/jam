const JsonPacket = require('./packets/JsonPacket');
const XmlPacket = require('./packets/XmlPacket');
const XtPacket = require('./packets/XtPacket');
const Protocol = require('.');

class AnimalJamProtocol extends Protocol {
  constructor(client) {
    super(client);

    /**
     * Remote handlers
     */
    this.regsiterRemoteHandler('login', require('./handlers/remote/Login'));
  }

  /**
   * Constructs the local packet
   * @param {string} packet Packet to construct
   * @returns {Packet}
   * @public
   */
  constructPacket(packet) {
    const type = this._check(packet);

    switch (type) {
      case this.packetType.XML: return new XmlPacket(packet);
      case this.packetType.XT: return new XtPacket(packet);
      case this.packetType.JSON: return new JsonPacket(packet);
      default: return null;
    }
  }

  /**
   * Called on incoming/outgoing packet
   * @param {number} type Packet type
   * @param {string} packet Packet to handle
   * @public
   */
  onPacket(type, packet) {
    this.parseAndFire(type, packet);
  }

  /**
   * Checks the packet type
   * @param {string} packet Packet to check
   * @returns {number}
   * @private
   */
  _check(packet) {
    if (packet.indexOf('<') !== -1 && packet.lastIndexOf('>') !== -1) return this.packetType.XML;
    if (packet.indexOf('%') !== -1 && packet.lastIndexOf('%') !== -1) return this.packetType.XT;
    if (packet.indexOf('{') !== -1 && packet.lastIndexOf('}') !== -1) return this.packetType.JSON;
    return this.packetType.UNDEFINED;
  }
}

module.exports = AnimalJamProtocol;
