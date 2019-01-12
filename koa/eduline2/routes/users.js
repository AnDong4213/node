const router = require('koa-router')()
router.prefix('/users')

let User = require('../models/UserModel');

router.get('/', function (ctx, next) {
  ctx.body = 'ctx is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'ctx is a users/bar response';
})

router.get('/login', async (ctx, next) => {
  await ctx.render('login', {})
})

router.post('/login', async function(ctx, nexy) {
  let email = ctx.request.body['email'];
  let pwd = ctx.request.body['pwd'];
  let rs = await User.findOne({email,pwd});
  if (rs !== null) {
    let loginbean = {
      id: rs._id,
      nicheng: rs.nicheng
    };
    ctx.session.loginbean = loginbean;
    ctx.redirect('/');
  } else {
    ctx.body = '邮箱/密码错误'
  }
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
  console.log(ctx.request.body['email'])
  try {
    await user.save();  // 和 koa1 一样，await不可少...
    ctx.status = 307;
    ctx.redirect('/users/login');
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

router.get('/logout', async (ctx, next) => {
  delete ctx.session.loginbean;
  ctx.redirect('/');
})

module.exports = router
