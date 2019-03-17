const express = require('express');
const router = express.Router();
const { SuccessModel, ErrorModel } = require('./../model/resModel');
const { getList, getDetail, newBlog, updateBlog, delBlog  } = require('./../controller/blog')
const loginCheck = require('./../middleware/loginCheck')

router.get('/', function(req, res, next) {
  res.send('我是blog下的根路由')
});

router.get('/list', function(req, res, next) {
  let author = req.query.author || '', keyword = req.query.keyword || '';
  if (req.query.isadmin) {
    if (req.session.username == null) {
      res.json(
        new ErrorModel('未登录')
      )
      return
    }
    author = req.session.username
  }

  const result = getList(author, keyword);
  return result.then(listData => {
    res.json(
      new SuccessModel(listData)
    )
    // res.send(new SuccessModel(listData).data[1])
  })
});

router.get('/detail', function(req, res, next) {
  const result = getDetail(req.query.id)
  return result.then(data => {
    res.json(
      new SuccessModel(data)
    )
  })
});

router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.username;
  const result = newBlog(req.body)
  return result.then(data => {
    res.json(
      new SuccessModel(data)
    )
  })
})

router.post('/update', loginCheck, (req, res, next) => {
  const result = updateBlog(req.query.id, req.body);
  return result.then(val => {
    if (val) {
      res.json(
        new SuccessModel()
      )
    } else {
      res.json(
        new ErrorModel('更新博客失败')
      )
    }
  })
})

router.post('/del', loginCheck, (req, res, next) => {
  const author = req.session.username
  const result = delBlog(req.query.id, author)
  return result.then(val => {
      if (val) {
          res.json(
              new SuccessModel()
          )
      } else {
          res.json(
              new ErrorModel('删除博客失败')
          )
      }
  })
})

module.exports = router;
