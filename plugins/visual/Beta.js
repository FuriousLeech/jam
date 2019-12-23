class Beta extends Plugin {
  constructor(server) {
    super(server, {
      name: 'beta',
      author: 'zane',
      commands: [
        {
          name: 'beta',
          description: 'Beta den',
          execute: ({ client }) => this.betaCommand(client),
        },
      ],
    });
  }

  /**
   * Beta command
   * @param {Client} client Client instance
   * @public
   */
  betaCommand(client) {
    client.localWrite('%xt%rp%0%player_den.room_main%0%0%0%0%0%%');
  }
}

module.exports = Beta;
