const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const mongoose = require('mongoose');

// const session = require('koa-generic-session');
const session = require('koa-session');
const MongooseStore = require('koa-session-mongoose');

const index = require('./routes/index')
const users = require('./routes/users')
const home = require('./routes/home')
const admin = require('./routes/admin')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

mongoose.connect('mongodb://localhost/eduline2', {useNewUrlParser: true});

app.use(views(__dirname + '/views', {
  // extension: 'pug'
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.keys = ['eduline2'];
app.use(session({ 
  store: new MongooseStore({
    expires: 20*60*1000,
    collection: 'mySessions'
  })
}, app));

const allowpage = ['/', '/users/login', '/users/zhuce', '/users/logout'];
app.use(async (ctx, next) => {
  let url = ctx.originalUrl;
  if (allowpage.indexOf(url) > -1) {
    await next();
  } else {
    if (ctx.session.loginbean) {
      await next();   // next加上()
    } else {
      ctx.redirect('/users/login');
      // ctx.response.redirect('/users/login');
    }
  }
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(home.routes(), home.allowedMethods())
app.use(admin.routes(), admin.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
