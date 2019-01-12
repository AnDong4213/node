var router = require('koa-router')();
router.prefix('/admin');

let User = require('../models/UserModel');

router.get('/', function *(next) {
  let loginbean = this.session.loginbean;
  this.state.loginbean = loginbean;
  if (loginbean.role != 0) {
      this.body = "<script>alert('您无权访问此页面qq');location.href='/'</script>";
      return;
  }
  yield this.render('adminhome', {})
});

router.get('/teacherapplylist', function *(next) {
  let rs = yield User.find({role: 2});
  yield this.render('teacherapplylist', {rs: rs})
});

module.exports = router;
