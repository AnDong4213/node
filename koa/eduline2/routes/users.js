const router = require('koa-router')()
router.prefix('/users')

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/eduline2', {useNewUrlParser: true});
var db = mongoose.connection;

let User = require('../models/UserModel');

router.get('/', function (ctx, next) {
  ctx.body = 'ctx is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'ctx is a users/bar response'
})

router.get('/login', async (ctx, next) => {
  await ctx.render('login', {})
})

router.post('/zhuce', async function(ctx, next) {
  /*let subflag = ctx.query['subflag'];
  let email = ctx.request.body['email'];
  // ctx.body = '收到Email:' + email + ',get收到: ' + subflag;
  ctx.response.body = '收到Email:' + email + ',get收到: ' + subflag;*/

  let user = new User({
    email: ctx.request.body['email'],
    pwd: ctx.request.body['pwd'],
    nicheng: ctx.request.body['nicheng']
  })
  try {
    await user.save();  // 和 koa1 一样，await不可少...
  } catch(err) {
    if (err.toString().indexOf('emailuiq') > -1) {
      ctx.response.body = 'Email重复...';
    } else if (err.toString().indexOf('nichenguiq') > -1) {
      ctx.response.body = '昵称重复...'
    }
    return;
  }
  /*user.save(function(err, rs) {
		if (err) console.error(err);
  });*/
  ctx.response.body = user._id;

})

module.exports = router
