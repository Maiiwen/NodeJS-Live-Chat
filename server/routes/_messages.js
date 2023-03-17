const Message = require("../models/Message");
let messages = (app) => {
    app.get('/api/messages', (req, res) => {
        let message = new Message()
        message.message = "Hello World"
        message.date = new Date()
        message.author.id = "d9207936-383a-41de-960b-f2802ffe15bb"
        message.author.username = "John Doe"


        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            "messages": [
                message
            ]
        }))
    })

}

module.exports = messages;