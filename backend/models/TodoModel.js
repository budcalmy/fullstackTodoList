const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
    },
    author: {
        type: String,
        require: true,
    }
}, {versionKey: false});

module.exports = mongoose.model('todo', todoSchema);