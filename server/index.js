const express = require('express');

const routes = require('./routes/routes.js');

const app = express();

const wsServer = require('./services/websocketServer.js');

const server = app.listen(3000);
server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request);
    });
});

app.use('/', routes);

app.use('/assets', express.static('./static/assets'));

wsServer.on('connection', function(connection) {
    console.log('Connection established');
    connection.on('message', function(message) {
        console.log('Message received');
        // send to all clients
        wsServer.clients.forEach(function(client) {
            // send message to all clients except the sender
            if (client !== connection) {
                client.send(message.toString());
            }
        });
    });
    connection.on('close', function() {
        console.log('Connection closed');
    });
});


