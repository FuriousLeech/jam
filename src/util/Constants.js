/**
 * Event types
 * @enum
 */
const EVENTS = {
  NEW_CONNECTION: 'connection',
  CONNECTION_REMOVED: 'disconnect',
};

/**
 * Connection state
 * @enum
 */
const CONNECTION_STATE = {
  IDLE: 0,
  CONNECTED: 1,
  DISCONNECTED: 2,
};


module.exports = { CONNECTION_STATE, EVENTS };
