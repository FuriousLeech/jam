class headdress extends Plugin {
  constructor(server) {
    super(server, {
      name: 'headdress',
      author: 'zane',
      commands: [
        {
          name: 'headdress',
          description: 'headdress item',
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
