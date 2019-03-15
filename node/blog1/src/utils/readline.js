const fs = require('fs')
const path = require('path')
const readline = require('readline')

const fileName = path.join(__dirname, '../', '../logs', 'access.log')
const readStream = fs.createReadStream(fileName)

// 创建 readline 对象
const rl = readline.createInterface({
  input: readStream
})

let chromeNum = 0, sum = 0, agent = 'Firefox';

rl.on('line', lineData => {
  if (!lineData) {
    return
  }
  sum ++

  const arr = lineData.split('--')
  if(arr[2] && arr[2].indexOf(agent) > 0) {
    chromeNum++
  }
})
// 监听读取完成
rl.on('close', () => {
  console.log(agent+' 占比：' + ((chromeNum / sum)*100).toFixed(2) + '%')
})