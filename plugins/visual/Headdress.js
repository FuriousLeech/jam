class headdress extends Plugin {
  constructor(server) {
    super(server, {
      name: 'headdress',
      author: 'Furious',
      commands: [
        {
          name: 'headdress',
          description: 'This gives you LPHD',
          execute: ({ client }) => this.headdressCommand(client),
        },
      ],
    });
  }

  /**
   * headdress command
   * @param {Client} client Client instance
   * @public
   */
  headdressCommand(client) {
    client.localWrite('%xt%ti%-1%1%1%1%0%243%260%855598340%1%0%259%');
  }
}

module.exports = headdress;
