const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    message: {
        type: String,
    },
    date: {
        type: Date,
    },
    author: {
        id: {
            type: String,
        },
        username: {
            type: String,
        }
    },
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;