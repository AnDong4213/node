var mongoose = require('mongoose');

var User = mongoose.model('user', new mongoose.Schema({
    email: String,
    pwd: String,
    nicheng: String,
    role: Number,
    realname: String,
    idnumber: String,
    photoname: String,
    photopath: String,
    preview: String,
    msgnum: Number
}))

module.exports = User;
