var mongoose = require('mongoose');
var Course = mongoose.model('course', new mongoose.Schema({
    title: String,
    type: Number,
    logo: String,
    brief: String,
    uid: String,
    uname: String,
    status: Number,  // 0未完结 1申请中 2审核通过
    pubtime: Date
}))

module.exports = Course;
