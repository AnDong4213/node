var mongoose = require('mongoose');

var Msg = mongoose.model('msg', new mongoose.Schema({
    send: String,
    sendname: String,
    message: String,
    role: Number,
    sendtime: Date
}))

module.exports = Msg;
