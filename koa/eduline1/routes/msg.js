var router = require('koa-router')();
router.prefix('/msg');

let User = require('../models/UserModel');
let Msg = require('../models/MsgModel');

router.post('/reply', function *(next) {
    let loginbean = this.session.loginbean;
    if (loginbean.role > 0 && this.request.body['message'] != '') {
        let msg = new Msg({
            send: loginbean.id,
            sendname: loginbean.nicheng,
            to: this.request.body['rid'],
            message: this.request.body['message'],
            sendtime: new Date()
        });
        let rs = yield msg.save();
        if (rs._id) {
            let rs1 = yield User.update({_id: this.request.body['rid']}, {$inc: {msgnum: 1}});
            if (rs1.ok) {
                this.body = 1;
            }
        } else {
            this.body = 0;
        }
    } else {
        this.body = 10;
    }
})

router.post('/newmsg', function *(next) {
    let loginbean = this.session.loginbean;
    if (loginbean.role > 0 && this.request.body['message'] != '') {
        let nicheng =  this.request.body['nicheng'];
        let urs = yield User.findOne({nicheng: nicheng});
        if (urs != null) {
            let toId = urs._id;
            this.body=1;
            let msg = new Msg({
                send: loginbean.id,
                sendname: loginbean.nicheng,
                to: toId,
                message: this.request.body['message'],
                sendtime: new Date()
            });
            let rs = yield msg.save();
            if (rs._id) {
                let rs1 = yield User.update({_id: toId},{$inc:{msgnum: 1}});
                if (rs1.ok) {
                    this.body = 1;
                }
            } else {
                this.body = 0;
            }
        } else {
            this.body = -1;
        }
    } else {
        this.body = 9;
    }
})

router.get('/delmsg', function *(next) {
    let loginbean = this.session.loginbean;
    if (loginbean.role > 0) {
        let id =  this.request.query['id'];
        let rs = yield Msg.remove({_id:id,to:loginbean.id});
        // console.log(rs);  // { n: 1, ok: 1 }
        if (rs.ok) {
            this.redirect('/home');
        } else {
            this.body='<script>alert("删除失败");location.href="/home";</script>';
        }
    }
})

module.exports = router;
