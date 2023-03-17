const path = require('path');

const security = (app) => {
    app.get('/login', (req, res) => {
        res.sendFile(path.join(__dirname, '../static/pages/login.html'))
    })
}

module.exports = security;