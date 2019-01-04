var router = require('koa-router')();

router.prefix('/users');

router.get('/', function *(next) {
  this.body = 'this is a users response!';
});

router.get('/login', function *(next) {
  yield this.render('login', {});
});

router.get('/zhuce', function *(next) {
  console.log(this);
  let email = this.query['email'];
  this.body = '收到Email:' + email;
});

module.exports = router;
