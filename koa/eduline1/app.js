var app = require('koa')(),
    logger = require('koa-logger'),
    json = require('koa-json'),
    views = require('koa-views'),
    onerror = require('koa-onerror'),
    mongoose = require('mongoose');
var session = require('koa-generic-session');
var MongooseStore = require('koa-session-mongoose');

var index = require('./routes/index');
var users = require('./routes/users');
var home = require('./routes/home');
var admin = require('./routes/admin');
var msg = require('./routes/msg');
var teacher = require('./routes/teacher');

// error handler
onerror(app);

// global middlewares
app.use(views('views', {
  root: __dirname + '/views',
  // default: 'jade'
  default: 'ejs'
}));
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(function *(next) {
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(require('koa-static')(__dirname + '/public'));
mongoose.connect('mongodb://localhost/eduline1', {useNewUrlParser: true});

app.keys = ['eduline1'];
app.use(session({
  store: new MongooseStore({
    expires: 20*60*1000,
    collection: 'mySessions'
  })
}));

var allowpage = ['/', '/users/login', '/users/zhuce', '/users/logout'];
app.use(function* (next) {
  var url = this.originalUrl;
  if (allowpage.indexOf(url) > -1) {
      yield next;
  } else {
      if (this.session.loginbean) {
          yield next;
      } else {
          this.redirect('/')
      }
  }
})

// routes definition
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(home.routes(), home.allowedMethods());
app.use(admin.routes(), admin.allowedMethods());
app.use(msg.routes(), msg.allowedMethods());
app.use(teacher.routes(), teacher.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
