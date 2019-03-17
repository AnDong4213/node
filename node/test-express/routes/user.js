const express = require('express');
const router = express.Router();
const { login } = require('./../controller/user')
const { SuccessModel, ErrorModel } = require('./../model/resModel')

router.post('/login', function(req, res, next) {
  const { username, password } = req.body;
  const result = login(username, password);
    return result.then(data => {
      if (data.username) {
        // 设置session
        req.session.username = data.username
        req.session.realname = data.realname
        // set(req.sessionId, req.session)
        
        res.json(
          new SuccessModel()
        )
        return 
      } else {
        res.json(
          new ErrorModel('登录失败')
        )
      }
  })
});

/* router.get('/login-test', (req, res, next) => {
    if (req.session.username) {
      res.json({
        errno: 0,
        msg: '已登录',
        username: req.session.username
      })
      return
    }
    res.json({
      errno: -1,
      msg: '未登录'
    })
}) */


/* router.get('/test-session', (req, res, next) => {
  const session = req.session
  if (session.viewNum == null) {
    session.viewNum = 0
  }
  session.viewNum ++
  res.json({
    viewNum: session.viewNum
  })
}) */

module.exports = router;

// console.log(session)
/* Session {
  cookie: { 
    path: '/',
    _expires: 2019-03-17T07:05:50.018Z,
    originalMaxAge: 300000,
    httpOnly: true 
  } 
} */

