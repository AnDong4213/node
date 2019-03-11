const querystring = require('querystring')
const  handleBlogRouter = require('./src/router/blog')
const  handleUserRouter = require('./src/router/user')

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
    let arr = item.split('='), key = arr[0], val = arr[1];
    req.cookie[key] = val;
  })

  getPostData(req).then(postData => {
    req.body = postData;

    let blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then(blogData => {
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

module.exports = serverHandle;

//  env: process.env.NODE_ENV


