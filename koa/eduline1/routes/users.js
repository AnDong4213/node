var router = require('koa-router')();
router.prefix('/users');

let User = require('../models/UserModel');

router.get('/', function *(next) {
  this.body = 'this is a users response!';
});

router.get('/login', function *(next) {
  yield this.render('login', {});
});

router.post('/login', function *(next) {
  let email = this.request.body['email'];
  let pwd = this.request.body['pwd'];
  let rs = yield User.findOne({email,pwd});
  if (rs != null) {
    let loginbean = {
      id: rs._id,
      nicheng: rs.nicheng,
      role: rs.role
    };
    this.session.loginbean = loginbean;
    // this.body = '登录成功';
    this.redirect('/')
  } else {
    this.body = '邮箱/密码错误'
  }
});

/* router.get('/zhuce', function *(next) {
  console.log(this);
  let email = this.query['email'];
  this.body = '收到Email:' + email;
}); */
router.post('/zhuce', function *(next) {
  /* let subflag = this.query['subflag'];
  let email = this.request.body['email'];
  this.body = '收到Email:' + email + ',get收到: ' + subflag; */

  let user = new User({
    email: this.request.body['email'],
    pwd: this.request.body['pwd'],
    nicheng: this.request.body['nicheng'],
    role: 1
  })

  /* user.save((err, rs) => {
		console.log(err);
  }) */

  try {
    yield user.save();   //  yield必须加, (坑...)
    this.status = 307;
    this.redirect('/users/login');
  } catch (err) {
    if (err.toString().indexOf('emailuiq') > -1) {
      this.body = 'Email重复...';
    } else if (err.toString().indexOf('nichenguiq') > -1) {
      this.body = '昵称重复...'
    }
    return;
  }
  this.body = user._id;
});

router.get('/logout', function* () {
  delete this.session.loginbean;
  this.redirect('/');
})

module.exports = router;
