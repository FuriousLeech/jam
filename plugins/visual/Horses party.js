class horse extends Plugin {
  constructor(server) {
    super(server, {
      name: 'horse',
      author: 'zane',
      commands: [
        {
          name: 'horse',
          description: 'horse party',
          execute: ({ client }) => this.horseCommand(client),
        },
      ],
    });
  }

  /**
   * horse command
   * @param {Client} client Client instance
   * @public
   */
  horseCommand(client) {
    client.localWrite('%xt%rp%3463826%party.venue_horse%0%5%13%100%252%%');
  }
}

module.exports = horse;
