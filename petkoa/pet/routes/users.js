const router = require('koa-router')()
router.prefix('/users')

const UserModel = require('../models/UserModel');

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/zhuce', async function (ctx, next) {
  let user = {
    email: ctx.request.body['email'],
    pwd: ctx.request.body['pwd'],
    nicheng: ctx.request.body['nicheng'],
    updtime: new Date(),
    role: 0,
    createtime: new Date()
  };
  try {
    let rs = await UserModel.create(user);
    // ctx.body = '插入成功...';
    ctx.body = 1;
  } catch(err) {
    let errMsg = err.errors[0].message;
    if (errMsg.indexOf('emailuniq') > -1) {
      // ctx.body = 'email重复';
      ctx.body = 2;
    } else if (errMsg.indexOf('nichenguniq') > -1) {
      // ctx.body = '昵称重复...';
      ctx.body = 3;
    } else {
      // ctx.body = '数据库错误...';
      ctx.body = '0';
    }
  }
})

router.post('/login', async function (ctx, next) {
  let user = {
    email: ctx.request.body['email'],
    pwd: ctx.request.body['pwd']
  };
  let rs = await UserModel.findOne({where: user});
  if (rs != null) {
    let loginbean = {
      id: rs.id,
      nicheng: rs.nicheng,
      role: rs.role
    };
    ctx.session.loginbean = loginbean;
    // ctx.body = '登录成功...';
    ctx.body = loginbean;
  } else {
    // ctx.body='账号/密码错误';
    ctx.body = 0;
  }
})

router.get('/mypet', async (ctx, next) => {
  let loginbean = ctx.session.loginbean;
  console.log(loginbean);
  ctx.body = 'xxyy'
})

module.exports = router
