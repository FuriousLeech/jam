class short extends Plugin {
  constructor(server) {
    super(server, {
      name: 'short',
      author: 'zane',
      commands: [
        {
          name: 'short',
          description: 'short item',
          execute: ({ client }) => this.shortCommand(client),
        },
      ],
    });
  }

  /**
   * short command
   * @param {Client} client Client instance
   * @public
   */
  shortCommand(client) {
    client.localWrite('%xt%ti%-1%1%1%1%0%276%260%1734947131%1%0%259%');
  }
}

module.exports = short;
