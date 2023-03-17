const path = require("path");
const logs = (app) => {
    app.get('/logs', async (req, res) => {
        res.sendFile(path.resolve(__dirname, '../static/pages/logs.html'));
    });

    app.get('/api/logs', async (req, res) => {
        require('../models/database.js');
        const Log = require('../models/Log.js');
        let logs = await Log.find({});
        // set headers to application/json
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(logs));
    });
}

module.exports = logs;