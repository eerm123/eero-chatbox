const form = document.querySelector('form');
const input = document.querySelector('#message');
const messages = document.querySelector('#messages');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // prevent page refresh on form submit

  // Send message to server
  socket.emit('chat message', input.value);

  // Clear input field
  input.value = '';
});

socket.on('chat message', (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
  messages.appendChild(li);
});
