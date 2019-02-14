const router = require('koa-router')()
// 用同步的写法完成异步的过程...
router.get('/', async (ctx, next) => {
  // ctx.cookies.set('pvid', Math.random())
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
