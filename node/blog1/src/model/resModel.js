class BaseModel {
  constructor(data, message) {
    if (typeof data === 'string') {
      this.message = data
      data = null  // 等于null就不向下执行了..
      message = null
    }
    if (data) {
			this.data = data
		}
		if (message) {
			this.message = message
		}
  }
}

class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.errno = 0
  }
}

class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.errno = -1
  }
}

// console.log(new SuccessModel('hh'))

module.exports = {
  SuccessModel,
  ErrorModel
}










