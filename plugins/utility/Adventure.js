class Adventure extends Plugin {
  constructor(server) {
    super(server, {
      name: 'adventure',
      author: 'zane',
      commands: [
        {
          name: 'adventure',
          description: 'Loads chests and gives experience',
          execute: ({ client }) => this.adventureCommand(client),
        },
      ],
    });

    /**
     * Chest load interval
     * @type {?Interval}
     * @public
     */
    this._interval = null;
  }

  /**
   * Sends the chest packet
   * @param {Client} client Client instance
   * @public
   */
  chest(client) {
    client.remoteWrite(`%xt%o%qat%4640562%treasure_1%0%`);
    client.remoteWrite('%xt%o%qatt%4640562%treasure_1%1%');
  }

  /**
   * Adventure command
   * @param {Client} client Client instance
   * @public
   */
  adventureCommand(client) {
    if (this._interval) {
      this.clear(client, this._interval);
      return;
    }

    this._interval = client.setInterval(() => this.chest(client), 600);
  }

  /**
   * Clears an interval
   * @param {Client} client Client instance
   * @param {Timeout} interval Interval to clear
   * @public
   */
  clear(client, interval) {
    client.clearInterval(interval);
    this._interval = null;
    this._id = 0;
  }
}

module.exports = Adventure;
