const Packet = require('./');

class XtPacket extends Packet {
  parse() {
    this.object = this.object.split('%');
    this.type = this.object[2] === 'o' ? this.object[3] : this.object[2];
  }

  toPacket() {
    return this.object.join('%');
  }
}

module.exports = XtPacket;
