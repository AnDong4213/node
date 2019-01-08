var router = require('koa-router')();
router.prefix('/users');

var mongoose = require('mongoose');   
mongoose.connect('mongodb://localhost/eduline1', {useNewUrlParser: true});

let User = require('../models/UserModel');


router.get('/', function *(next) {
  this.body = 'this is a users response!';
});

router.get('/login', function *(next) {
  yield this.render('login', {});
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
    nicheng: this.request.body['nicheng']
  })

  /* user.save((err, rs) => {
		console.log(err);
  }) */

  try {
    yield user.save();   //  yield必须加，（坑...）
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

module.exports = router;
