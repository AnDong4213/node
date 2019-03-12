const querystring = require('querystring')
const  handleBlogRouter = require('./src/router/blog')
const  handleUserRouter = require('./src/router/user')

// session数据
const SESSION_DATA = {};

// cookie的过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + 24*60*60*1000)
  return d.toGMTString();
}

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(
        JSON.parse(postData)
      )
    })

  })
}

const serverHandle = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const url = req.url;
  if (url !== '/favicon.ico') {
    req.path = url.split('?')[0];

    // 解析query
    req.query = querystring.parse(url.split('?')[1]);

    // 解析coookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || '';
    cookieStr.split(';').forEach(item => {
      if (!item) {
        return
      }
      let arr = item.split('='), key = arr[0].trim(), val = arr[1].trim();
      req.cookie[key] = val;
    })

    // 解析cookie
    let needSetCookie = false
    let userId = req.cookie.userid
    console.log('SESSION_DATA', SESSION_DATA)
    console.log('SESSION_DATA[userId]', SESSION_DATA[userId])
    if (userId) {
      if (!SESSION_DATA[userId]) {
        SESSION_DATA[userId] = {}
      }
    } else {
      needSetCookie = true
      userId = `${Date.now()}_${Math.random()}`
      SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId];
    console.log('-------', req.session)

    getPostData(req).then(postData => {
      req.body = postData;
      let blogResult = handleBlogRouter(req, res);
      if (blogResult) {
        blogResult.then(blogData => {
          if (needSetCookie) {
            res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
          }
          res.end(
            JSON.stringify(blogData)
          )
        })
        return
      }

      // 处理user路由...
      let userResult = handleUserRouter(req, res);
      if (userResult) {
        userResult.then(userData => {
          if (needSetCookie) {
            res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
          }
          res.end(
            JSON.stringify(userData)
          )
        })
        return
      }

      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('404 Not Found\n');
      res.end()
    })
  }

}

module.exports = serverHandle;
//  env: process.env.NODE_ENV


