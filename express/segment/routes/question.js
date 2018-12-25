var express = require('express');
var router = express.Router();
var checkSession = require('../jsbean/CheckSession');
var questionModel = require('../models/questionModel');

router.all('/ask', function(req, res) {
    let loginbean = checkSession.check(req, res);
    if (!loginbean) {
        return;
    }
    if (req.body['subflag'] === undefined) {
        res.render('ask', {
            name: '张三',
            loginbean
        });
    } else {
        questionModel.ask(req,res);
    }
    
})

router.get('/detail', function(req, res) {
    let loginbean = req.session.loginbean;
    questionModel.queDetail(req, res, loginbean);
})

router.post('/reply', function(req, res) {
    questionModel.reply(req, res);
})

module.exports = router;


