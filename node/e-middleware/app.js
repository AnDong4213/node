const express = require('express')
const app = express()

app.use((req, res, next) => {
  console.log('请求开始...', req.method, req.url)
  next()
})

app.use((req, res, next) => {
  req.cookie = {
    userId: '123'
  }
  next()
})

app.use((req, res, next) => {
  setTimeout(() => {
    req.body = {
      a: 100,
      b: 200
    }
    next()
  })
})

app.use('/api', (req, res, next) => {
  console.log('处理 /api 路由')
  next()
})   // 这个走

/* app.use('/api', (req, res, next) => {
  console.log('处理 /api 路由22222')
  next()
})  */   // http://localhost:3000/api/get-cookie  这个走

app.get('/api', (req, res, next) => {
  console.log('get /api 路由3333333333333333333333333333')
  next()
})  // 这个不走

app.post('/api', (req, res, next) => {
  console.log('post /api 路由')
  next()
})

function loginCheck(req, res,next) {
  /* console.log('模拟登陆成功')
  setTimeout(() => {
    next()
  }) */
  setTimeout(() => {
    console.log('模拟登陆失败')
    res.json({
      errno: -1,
      msg: '登录失败'
    })
  })
}

app.get('/api/get-cookie', loginCheck, (req, res, next) => {
  console.log('get /api/get-cookie')
  res.json({
    errno: 0,
    data: req.cookie
  })
})

app.post('/api/get-post-data', (req, res, next) => {
  console.log('post /api/get-post-data')
  res.json({
    errno: 0,
    data: req.body
  })
})

app.use((req, res, next) => {
  console.log('处理 404')
  res.json({
    errno: -1,
    msg: '404 not fount'
  })
})

app.listen(3000, () => {
  console.log('PORT 3000')
})


