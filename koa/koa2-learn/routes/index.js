const router = require('koa-router')()
// 用同步的写法完成异步的过程...

// 服务器的session是用来存储用户的信息的...
// 服务器的session是如何保持到客户端的,要用到客户端的cookie
// 服务端用session来保持用户的状态，客户端用cookie来保存session
// 服务器端把session种植到cookie中，下次访问时cookie会带着session过来，达到身份认证的过程...

router.get('/', async (ctx, next) => {
  // ctx.cookies.set('pvid', Math.random())
  ctx.session.count = 0
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json',
    cookie: ctx.cookies.get('pvid')
  }
})

router.get('/test', async (ctx) => {
  console.log('start', new Date().getTime());
  const a = await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('aa', new Date().getTime());
      resolve('我是Promise返回的--aaa');
    }, 1000)
  });
  console.log(a);
  console.log('end', new Date().getTime());
  // const b = await 123;  // await后面不是Promise的话，会自动转化成Promise对象...
  const b = await Promise.resolve(123);
  ctx.body = {
    a,
    b
  }
})

module.exports = router
