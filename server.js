const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('message', (msg) => {
    socket.emit('serverResponse', msg); // To sender
    socket.broadcast.emit('message', msg); // To others
  });

  socket.on('image', (imgData) => {
    io.emit('image', imgData); // Broadcast to everyone including sender
  });
});

http.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
