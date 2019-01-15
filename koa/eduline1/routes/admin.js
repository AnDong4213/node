var router = require('koa-router')();
router.prefix('/admin');

let User = require('../models/UserModel');
let Msg = require('../models/MsgModel');

router.get('/', function *(next) {
  let loginbean = this.session.loginbean;
  this.state.loginbean = loginbean;
  if (loginbean.role != 0) {
      this.body = "<script>alert('您无权访问此页面qq');location.href='/'</script>";
      return;
  }
  yield User.update({_id: loginbean.id}, {$set: {msgnum: 0}});
  loginbean.msgnum = 0;
  this.session.loginbean = loginbean;
  this.state.loginbean = loginbean;
  let rsAdmin = yield Msg.find({to: loginbean.id});
  yield this.render('adminhome', {rsadmin: rsAdmin});
});

router.get('/teacherapplylist', function *(next) {
  let rs = yield User.find({role: 2});
  yield this.render('teacherapplylist', {rs: rs});
});

router.get('/pass', function *(next) {
    let loginbean = this.session.loginbean;
    if (loginbean.role == 0) {
        let id = this.query['id'];
        let rs = yield User.update({_id: id}, {$set: {role: 3}, $inc: {msgnum: 1} });
        // console.log(rs);  // { n: 1, nModified: 1, ok: 1 }
        if (rs.ok) {
            let msg = new Msg({
                send: loginbean.id,
                sendname: loginbean.nicheng,
                sendtime: new Date(),
                message: '您的讲师申请已通过审核',
                to: id
            });
            let mrs = yield msg.save();
            if (mrs._id) {
                this.body = 1;
            } else {
                this.body = 2;  // 插入消息失败
            }
        } else {
            this.body = 0;
        }
    }
})

router.get('/refuse', function *(next) {
    let loginbean = this.session.loginbean;
    if (loginbean.role == 0) {
        let id = this.query['uid'];
        // let beRejected = yield User.findOne({_id: id});
        let rs = yield User.update({_id: id}, {$set: {role: 1}, $inc: {msgnum: 1} });
        if (rs.ok) {
            let msg = new Msg({
                send: loginbean.id,
                sendname: loginbean.nicheng,
                sendtime: new Date(),
                message: this.query['message'],
                to: id
            });
            let mrs = yield msg.save();
            if (mrs._id) {
                this.body = 1;
            } else {
                this.body = 2;  // 插入消息失败
            }
        } else {
            this.body = 0;  // 驳回失败
        }
    }
});

module.exports = router;
