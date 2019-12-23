const { notify } = require('../../src/util');

class Notify extends Plugin {
  constructor(server) {
    super(server, {
      name: 'notify',
      author: 'zane',
      hooks: [
        {
          packet: 'ti',
          type: 'remote',
          execute: ({ packet }) => this.onTrade(packet),
        },
      ],
    });
  }

  /**
   * Called upon trade requests
   * @param {XtPacket} packet The packet to handle
   * @public
   */
  onTrade(packet) {
    const username = packet.object[5];
    const type = Number(packet.object[4]);

    if (type === 0) {
      notify({
        title: 'Trade Request',
        message: `Incoming trade request from ${username}`,
        wait: true,
      });
    }
  }
}

module.exports = Notify;
