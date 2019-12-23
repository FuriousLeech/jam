class Help extends Plugin {
  constructor(server) {
    super(server, {
      name: 'help',
      author: 'zane',
      commands: [
        {
          name: 'help',
          description: 'Displays the list of commands and their description',
          execute: ({ client }) => this.commandList(client),
        },
      ],
    });
  }

  /**
   * Displays the list of commands
   * @param {Client} client Client instance
   * @returns {Promise<void>}
   * @public
   */
  commandList(client) {
    const { prefix } = Config.get('settings');
    let commands = '';

    for (const [command, value] of this.server.plugins.commands) {
      commands += `${prefix}${command} - ${value.description}\n\n`;
    }
    return client.serverMessage(commands);
  }
}

module.exports = Help;
