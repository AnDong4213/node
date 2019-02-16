const Router = require('koa-router')

const router = new Router({
  prefix: '/city'
})

router.get('/list', async (ctx) => {
  ctx.body = {
    list: ['BJ', 'TJ'],
    name: 'andong'
  }
})

module.exports = router;

