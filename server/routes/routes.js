const index = require('./_index.js');
const logs = require('./_logs.js');
const messages = require('./_messages.js');
const security = require('./_security.js');

const express = require('express');
const router = express.Router();
const Log = require('../models/Log.js');
require('../models/database.js')

router.use((req,res,next) => {
    console.log(new Date() + " : " + req.socket.remoteAddress + ' Received request for ' + req.url);
    // log connection to database
    const log = new Log({
        ip: req.socket.remoteAddress,
        date: new Date(),
        path: req.url
    });
    log.save();
    next();
})

index(router);
logs(router);
messages(router);
security(router);

module.exports = router;
