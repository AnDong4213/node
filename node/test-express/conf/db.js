const env = process.env.NODE_ENV;

let MYSQL_CONF ,REDIS_CONF;

if (env === 'dev') {
  // mysql
  MYSQL_CONF = {
    host: 'localhost',
    user: 'zad',
    password: '123456',
    port: '3306',
    database: 'mgblog1'
  }
  // redis
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

if (env === 'production') {
  // mysql
  MYSQL_CONF = {
      host: 'localhost',
      user: 'zad',
      password: '123456',
      port: '3306',
      database: 'mgblog1'
  }

  // redis
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}


