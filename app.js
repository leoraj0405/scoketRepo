// server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app); // Use HTTP server for WebSocket

// Set up WebSocket server on the same HTTP server
const wss = new WebSocket.Server({ server });

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('🔌 Client connected');

  ws.on('message', (bufferReceived) => {
    const buffer = Buffer.from(bufferReceived);
    const str = buffer.toString();
    console.log('📨 Received:', str);
    ws.send('From server:' + str);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`📢 Broadcast: ${str} joined`);
      }
    });
  });

  ws.on('close', () => {
    console.log('❌ Client disconnected');
  });
});

// Serve static files (like index.html)
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('hello world')
});


// Start server
server.listen(3000, () => {
  console.log('✅ Server running at http://localhost:3000');
});
