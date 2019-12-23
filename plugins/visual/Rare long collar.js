class long extends Plugin {
  constructor(server) {
    super(server, {
      name: 'long',
      author: 'Furious',
      commands: [
        {
          name: 'long',
          description: 'This gives you Rare Long Spiked Collar',
          execute: ({ client }) => this.longCommand(client),
        },
      ],
    });
  }

  /**
   * long command
   * @param {Client} client Client instance
   * @public
   */
  longCommand(client) {
    client.localWrite('%xt%ti%-1%1%1%1%0%285%260%1734947131%1%0%259%');
  }
}

module.exports = long;
