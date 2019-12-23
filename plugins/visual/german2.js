class german extends Plugin {
  constructor(server) {
    super(server, {
      name: 'german',
      author: 'mushroom',
      commands: [
        {
          name: 'german',
          description: 'teleports to empty german server',
          execute: ({ client }) => this.germanCommand(client),
        },
      ],
    });
  }

  /**
   * german command
   * @param {Client} client Client instance
   * @public
   */
  germanCommand(client) {
    client.remoteWrite(`%xt%o%rj%5063760%jamaa_township.room_main#98%1%0%0%`);
    
  }
}

module.exports = german;
