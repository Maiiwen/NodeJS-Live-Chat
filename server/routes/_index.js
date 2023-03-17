const path = require("path");
const index = (app) => {
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../static/index.html'));
    });
}

module.exports = index;