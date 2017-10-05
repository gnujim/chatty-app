// server.js

const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });
const uuid = require('uuid');

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', ws => {
  console.log('Client connected');

  ws.on('message', data => {
    let msg = JSON.parse(data);
    console.log(msg);
    let message = {};
    // MAP
    switch (msg.type) {
      case 'postMessage':
        console.log(`User ${msg.username} said ${msg.content}. Type is ${msg.type}`);
        message = {
          type: 'incomingMessage',
          id: uuid(),
          username: msg.username,
          content: msg.content
        };
        break;
      case 'postNotification':
        console.log(`Type is ${msg.type}`);
        message = {
          type: 'incomingNotification',
          id: uuid(),
          content: msg.content
        };
        break;
      default:
        console.log('Server Side Error');
    }
    wss.broadcast(JSON.stringify(message));
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

wss.broadcast = msg => {
  wss.clients.forEach(client => {
    client.send(msg);
  });
};
