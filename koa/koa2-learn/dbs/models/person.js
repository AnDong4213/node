var mongoose = require('mongoose');

var Person = mongoose.model('Person', new mongoose.Schema({
    name: String,
    age: Number
}))

module.exports = Person;
