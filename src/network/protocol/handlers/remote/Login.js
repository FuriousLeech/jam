const Handler = require('../');

class Remote extends Handler {
  handle(packet) {
    const information = packet.object.b.o.params;

    this.client.constructPlayer(information);
  }
}

module.exports = Remote;
