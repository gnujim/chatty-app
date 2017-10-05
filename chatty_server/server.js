// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', ws => {
  let openCount = {
    type: 'userCount',
    count: wss.clients.size
  };
  console.log('Client connected');
  wss.broadcast(JSON.stringify(openCount));

  ws.on('message', data => {
    let msg = JSON.parse(data);
    let message = {};
    switch (msg.type) {
      case 'postMessage':
        message = {
          type: 'incomingMessage',
          id: uuid(),
          username: msg.username,
          content: msg.content,
          color: msg.color
        };
        break;
      case 'postNotification':
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
  ws.on('close', () => {
    let closeCount = {
      type: 'userCount',
      count: wss.clients.size
    };
    console.log('Client disconnected');
    wss.broadcast(JSON.stringify(closeCount));
  });
});

wss.broadcast = msg => {
  wss.clients.forEach(client => {
    client.send(msg);
  });
};
