const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const { Socket } = require('dgram');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve HTML file
app.use(express.static(path.join(__dirname, 'public')));

// Handle socket connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('message', (msg) => {

    // Respond to sender
    socket.emit('serverResponse', `${msg}`);

    // Broadcast to others
    socket.broadcast.emit('message', ` ${socket.id.slice(0, 4)} : ${msg}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});
