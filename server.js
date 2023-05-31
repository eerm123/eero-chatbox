const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const messageHistory = [];

// Serve static files from the "public" directory
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Public/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Send the message history to the newly connected user
  socket.emit('message history', messageHistory);

  // Handle incoming messages
  socket.on('chat message', ({ username, message, isImage }) => {
    console.log('message: ' + message);

    // Save the message to the message history
    messageHistory.push({ username, message, isImage });

    // Limit message history to a certain number of messages, for example, 100:
    if (messageHistory.length > 100) {
      messageHistory.shift();
    }

    // Broadcast the message to all connected clients
    io.emit('chat message', { username, message, isImage });
  });
});

http.listen(process.env.PORT || 5000, () => {
  console.log('listening on *:' + (process.env.PORT || 5000));
});
