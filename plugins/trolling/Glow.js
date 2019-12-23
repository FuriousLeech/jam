const { random } = require('lodash');

class Glow extends Plugin {
  constructor(server) {
    super(server, {
      name: 'glow',
      author: 'zane',
      commands: [
        {
          name: 'glow',
          description: 'Changes your avatar color glow',
          execute: ({ client }) => this.glowCommand(client),
        },
      ],
    });

    /**
     * Glow interval
     * @type {?Interval}
     * @private
     */
    this._interval = null;
  }

  /**
   * Sends the glow packet
   * @param {Client} client The client instance
   * @public
   */
  glow(client) {
    const color = random(1019311667, 4348810240);
    client.remoteWrite(`<msg t="sys"><body action="pubMsg" r="2002"><txt><![CDATA[${color}%8]]></txt></body></msg>`); // eslint-disable-line max-len
  }

  /**
   * Glow command
   * @param {Client} client The client instance
   * @public
   */
  glowCommand(client) {
    if (this._interval) {
      this.clear(client, this._interval);
      return;
    }

    this._interval = client.setInterval(() => this.glow(client), 600);
    client.serverMessage('Only other players will be able to see your glow.');
  }

  /**
   * Clears an interval
   * @param {Client} client Client instance
   * @param {Timeout} interval Interval to clear
   */
  clear(client, interval) {
    client.clearInterval(interval);
    this._interval = null;
    this._id = 0;
  }
}

module.exports = Glow;
