/* eslint-disable prefer-arrow-callback */
const messager = {};

let commands = [];

/**
 * Elements
 */
const input = document.getElementById('input');

/**
 * Gets the time
 */
messager.getTime = () => {
  const time = new Date();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const timeString = `${hour}:${minute}`;

  return timeString;
};

/**
 * Handles the message html
 */
messager.messageHTML = messageData => {
  const container = document.createElement('div');
  const time = document.createElement('div');
  const message = document.createElement('div');

  container.className = `message ${messageData.type || ''}`;

  // Time
  time.className = 'time';
  time.textContent = `${messager.getTime()} `;
  container.appendChild(time);

  // Message
  message.textContent = `${messageData.message}`;
  message.className = 'message-content';

  container.appendChild(message);
  return container;
};

/**
 * Shows the message
 */
messager.showMessage = messageData => {
  const messageElement = messager.messageHTML(messageData);

  document.getElementById('messages').appendChild(messageElement);
  messager.scrollToBottom(messageElement.offsetHeight);
};

/**
 * Handles commands
 */
messager.handleInput = message => {
  if (message.startsWith('/')) {
    const params = message.split(' ');
    const command = params.shift().slice(1);

    socket.emit('game:command', { command, params });
  }
};

/**
 * Handles incoming packet messages
 */
socket.on('packet', data => {
  const type = data.packetType;
  const packet = data.packet;

  messager.showMessage({
    message: `${type === 'local' ? '[Animal Jam]' : '[Client]'} ${packet}`,
    type,
  });
});

/**
 * Handles the commands data
 */
socket.on('commands', data => {
  data.commands.forEach(command => commands.push({ value: `/${command.cmd}`, data: command.description }));
});

/**
 * Input events
 */
input.addEventListener('keydown', e => {
  const keyCode = e.which;

  if (keyCode === 13) {
    messager.handleInput(input.value);
    input.value = '';
  }
});

/**
 * Scroll to bottom
 */
messager.scrollToBottom = elHeight => {
  const messageContainer = document.getElementById('messages');
  const totalScroll = messageContainer.scrollHeight - messageContainer.offsetHeight;
  const currentScroll = messageContainer.scrollTop;

  if (totalScroll - currentScroll <= elHeight) {
    messageContainer.scrollTop = totalScroll;
  }
};

/**
 * Welcome message
 */
messager.showMessage({
  message: '-:://::- Jam Dashboard -:://::-',
  type: 'jam',
});

/**
 * Auto complete
 */
$(function() {
  $('#input').autocomplete({
    source: commands,
    position: { collision: 'flip' },
  });
});
