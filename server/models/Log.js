const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    ip: {
        type: String,
    },
    date: {
        type: Date,
    },
    path: {
        type: String,
    }
});

module.exports = mongoose.model('Log', LogSchema);