const ws = require('websocket');
const express = require('express');

const routes = require('./routes/routes.js');

const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.use('/', routes);

app.use('/assets', express.static('./static/assets'));

wsServer = new ws.server({
    httpServer: app,
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
}

// wsServer.on('request', function(request) {
//     if (!originIsAllowed(request.origin)) {
//         // Make sure we only accept requests from an allowed origin
//         request.reject();
//         console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
//         return;
//     }
//
//     let connection = request.accept('echo-protocol', request.origin);
//     console.log((new Date()) + ' Connection accepted.');
//     connection.on('message', function(message) {
//         if (message.type === 'utf8') {
//             console.log('Received Message: ' + message.utf8Data);
//             connection.sendUTF(message.utf8Data);
//         }
//         else if (message.type === 'binary') {
//             console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
//             connection.sendBytes(message.binaryData);
//         }
//     });
//     connection.on('close', function(reasonCode, description) {
//         console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
//     });
// });


