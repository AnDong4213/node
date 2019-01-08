var mongoose = require('mongoose');

var User = mongoose.model('user', new mongoose.Schema({
    email: String,
    pwd: String,
    nicheng: String
}))

module.exports = User;

