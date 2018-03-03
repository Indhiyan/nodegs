var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodegs');

module.exports = mongoose;