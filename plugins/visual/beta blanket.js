class blanket extends Plugin {
  constructor(server) {
    super(server, {
      name: 'blanket',
      author: 'zane',
      commands: [
        {
          name: 'blanket',
          description: 'blanket beta',
          execute: ({ client }) => this.blanketCommand(client),
        },
      ],
    });
  }

  /**
   * blanket command
   * @param {Client} client Client instance
   * @public
   */
  blanketCommand(client) {
    client.localWrite('%xt%ti%-1%1%1%1%0%156%260%588817920%1%0%259%');
  }
}

module.exports = blanket;
