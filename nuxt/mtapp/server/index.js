const Koa = require('koa')
// import Koa from 'koa'
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const bodyparser = require('koa-bodyparser')
const mongoose = require('mongoose')
const session = require('koa-session');
// const session = require('koa-generic-session');
const Redis = require('koa-redis')
const json = require('koa-json')

import dbConfig from './dbs/config'
// import passport from './interface/utils/passport'
const passport = require('koa-passport')

import users from './interface/users'
import geo from './interface/geo'
import search from './interface/search'
import categroy from './interface/categroy'
import cart from './interface/cart'

const app = new Koa()

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  app.keys = ['mt', 'keys']
  app.proxy = true
  app.use(session({
    key: 'an',
    prefix: 'dong:uid',
    // maxAge: 10*60*1000,
    store: new Redis()
  }, app));
 
  app.use(passport.initialize())
  app.use(passport.session())

  app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
  }))
  app.use(json())

  mongoose.connect(dbConfig.dbs, {
    useNewUrlParser: true
  });

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  
  app.use(users.routes(), users.allowedMethods())
  app.use(geo.routes(), geo.allowedMethods())
  app.use(search.routes(), search.allowedMethods())
  app.use(categroy.routes(), categroy.allowedMethods())
  app.use(cart.routes(), cart.allowedMethods())

  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
