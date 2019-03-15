const fs = require('fs')
const path = require('path')

function addZero(m){
  return m < 10 ? '0' + m : m;
}
function formatDate() {
  let time = new Date();
  let y = time.getFullYear(), m = time.getMonth()+1, d = time.getDate();
  let h = time.getHours(), mm = time.getMinutes(), s = time.getSeconds();
  return y+'/'+addZero(m)+'/'+addZero(d)+' '+addZero(h)+':'+addZero(mm)+':'+addZero(s);
}

// 写日志
function writeLog(writeStream, log) {
  writeStream.write(log + '\n\n')
}

// 生成 write Stream
function createWriteStream(fileName) {
  let fullFileName = path.join(__dirname, '../', '../logs', fileName)
  let writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a'
  })
  return writeStream
}

const accessWriteStream = createWriteStream('access.log')

function access(log) {
  writeLog(accessWriteStream, log)
}

module.exports = {
  access,
  formatDate
}