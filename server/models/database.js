const mongoose = require('mongoose');
mongoose.connect('mongodb://root:example@mongo:27017/', { useNewUrlParser: true, useUnifiedTopology: true });