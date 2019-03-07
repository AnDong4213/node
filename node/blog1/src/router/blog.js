const handleBlogRouter = (req, res) => {
  const method = req.method;
  const url = req.url;
  const path = url.split('?')[0];

  if (method === 'GET' && path === '/api/blog/list') {
    return {
      msg: '列表接口'
    }
  }

  if (method === 'GET' && path === '/api/blog/detail') {
    return {
      msg: '详情接口'
    }
  }

  if (method === 'POST' && path === '/api/blog/new') {
    return {
      msg: '新建接口'
    }
  }

  if (method === 'POST' && path === '/api/blog/update') {
    return {
      msg: '更新接口'
    }
  }

  if (method === 'POST' && path === '/api/blog/del') {
    return {
      msg: '删除接口'
    }
  }

}

module.exports = handleBlogRouter;




