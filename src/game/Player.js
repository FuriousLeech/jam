class Player {
  constructor(client, { userId, userName }) {
    /**
     * Client that instantiated this player
     * @type {Client}
     * @public
     */
    this._client = client;

    /**
     * Id that instantiated this player
     * @type {number}
     * @public
     */
    this.userId = userId;

    /**
     * Username that instantiated this player
     * @type {string}
     * @public
     */
    this.username = userName;
  }

  /**
   * Sends a message to the server
   * @param {string} text Message to send
   * @returns {Promise<void>}
   * @public
   */
  message(text) {
    // eslint-disable-next-line max-len
    return this._client.remoteWrite(`<msg t="sys"><body action="pubMsg" r="724201"><txt><![CDATA[${text}%9]]></txt></body></msg>`);
  }
}

module.exports = Player;
