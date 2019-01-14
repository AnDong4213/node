var mongoose = require('mongoose');

var Msg = mongoose.model('msg', new mongoose.Schema({
    send: String,
    sendname: String,
    message: String,
    to: String,
    sendtime: Date
}))

module.exports = Msg;
