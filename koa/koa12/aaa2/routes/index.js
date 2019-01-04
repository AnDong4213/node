const router = require('koa-router')()

router.get('/', async (ctx, next) => {

  let rs = await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('执行setTimeout');
      resolve('返回结果...');
    }, 2000)
  })

  ctx.body = 'Hello,koa2--'+rs;

  /* await ctx.render('index', {
    title: 'Hello Koa 2!'
  }) */
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
