const { SuccessModel, ErrorModel } = require('./../model/resModel');
const { getList, getDetail, newBlog, updateBlog, delBlog  } = require('./../controller/blog')

// 统一的登录验证函数
const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(
      new ErrorModel('尚未登录')
    )
  }
}

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;

  if (method === 'GET' && req.path === '/api/blog/list') {
    let author = req.query.author || '', keyword = req.query.keyword || '';
    if (req.query.isadmin) {
      let loginCheckResult = loginCheck(req)
      if (loginCheckResult) {
        return loginCheckResult
      }
      author = req.session.username
    }
    const result = getList(author, keyword);
	// console.log(result)  // Promise { <pending> }
	/* console.log(result.then(listData => {  Promise { <pending> }
      console.log(listData[0].title) 
    })) */
    return result.then(listData => {
		// console.log(listData[0].content)
      return new SuccessModel(listData)
    })
  }

  if (method === 'GET' && req.path === '/api/blog/detail') {
    const result = getDetail(id);
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  if (method === 'POST' && req.path === '/api/blog/new') {
    let loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }

    req.body.author = req.session.username;
    const result = newBlog(req.body)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  if (method === 'POST' && req.path === '/api/blog/update') {
    let loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }

    const result = updateBlog(id, req.body);
    return result.then(res => {
      if (res) {
        return new SuccessModel()
      } else {
        return new ErrorModel('更新博客失败')
      }
    })
  }

  if (method === 'POST' && req.path === '/api/blog/del') {
    let loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }

    const author = req.session.username;
    const result = delBlog(id, author);
    return result.then(res => {
      if (res) {
        return new SuccessModel()
      } else {
        return new ErrorModel('失败...')
      }
    })
  }

}

module.exports = handleBlogRouter;




