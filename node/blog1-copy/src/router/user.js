const { login } = require('./../controller/user')
const { SuccessModel, ErrorModel } = require('./../model/resModel')

const handleUserRouter = (req, res) => {
  const method = req.method;

  /* if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body;
    const result = login(username, password);
    return result.then(res => {
      if (res.username) {
        return new SuccessModel()
      } else {
        return new ErrorModel('登录失败...')
      }
    })
  } */

  if (method === 'GET' && req.path === '/api/user/login') {
    const { username, password } = req.query;
    const result = login(username, password);
    return result.then(data => {
      if (data.username) {
        // 设置session
        req.session.username = data.username
        req.session.realname = data.realname
        console.log('=========', req.session)
        return new SuccessModel()
      } else {
        return new ErrorModel('登录失败')
      }
    })
  }

  if (method === 'GET' && req.path === '/api/user/login-test') {
    console.log('++++++++', req.session)
    if (req.session.username) {
      return Promise.resolve(
        new SuccessModel({
          session: req.session
        })
      )
    }
    return Promise.resolve(
      new ErrorModel('尚未登录')
    )
  }

}

module.exports = handleUserRouter;
