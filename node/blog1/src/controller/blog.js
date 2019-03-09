const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: '标题1'
    },
    {
      id: 2,
      title: '标题2'
    }
  ]
}

const getDetail = (id) => {
  return [
    {
      id: 1,
      title: '标题1'
    }
  ]
}

const newBlog = (blogData = {}) => {
  return {
    id: 3
  }
}

const updateBlog = (id, blogData = {}) => {
  return true
}

const delBlog = (id) => {
  return false
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}

