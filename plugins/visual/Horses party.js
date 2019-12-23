class horse extends Plugin {
  constructor(server) {
    super(server, {
      name: 'horse',
      author: 'Furious',
      commands: [
        {
          name: 'horse',
          description: 'This brings you to the horses only party.',
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
