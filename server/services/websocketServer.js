const ws = require("ws");
const wsServer = new ws.Server({ noServer: true });

module.exports = wsServer
