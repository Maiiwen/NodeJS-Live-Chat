const Message = require("../models/Message");
const bp = require("body-parser");
let messages = (app) => {
    app.get('/api/messages', async (req, res) => {
        try {
            const messages = await Message.find({})
            res.send(messages)

        } catch (err) {
            console.error(err)
        }
    })
    app.delete('/api/messages/:id', async (req, res) => {
        try {
            await Message.findByIdAndDelete(req.params.id);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({
                "deletedMessage" : req.params.id,
                "message": "Message deleted"
            }))
        } catch (err) {
            console.error(err)

        }

    })

    app.use(bp.json())
    app.use(bp.urlencoded({extended: true}))

    app.post('/api/messages', (req, res) => {
        // create new message using mongoose
        let message = new Message(req.body)
        message.save()

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            "messageAdded": message,
            "message": "Message added"
        }))
    })

    app.put('/api/messages/:id', async (req, res) => {
        let message = await Message.findById(req.params.id)
        console.log(message)
        message.message = req.body.message
        message.save()

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            "messageUpdated": message,
            "message": "Message updated"
        }))
    })

}

module.exports = messages;