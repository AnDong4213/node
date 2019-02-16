const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const mongoose = require('mongoose')
const session = require('koa-session');
const Redis = require('koa-redis')

const pv = require('./midware/pv')
const m1 = require('./midware/m1')
const m2 = require('./midware/m2')
const m3 = require('./midware/m3')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(pv())
app.use(m1())
app.use(m2())
app.use(m3())

app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))
mongoose.connect('mongodb://localhost/dbs', {useNewUrlParser: true});

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.keys = ['koalearn', 'key']
app.use(session({
  key: 'mt',
  prefix: 'mtpr',
  store: new Redis({
    expires: 20*60*1000,
    haha: 'hehe'
  })
}, app));

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
