let CryptoJS = require('crypto-js')
let md5 = require('crypto-js/md5')
let time = Date()

console.log(time)
console.log(Math.random() * 1000 + time)
// console.log(CryptoJS.MD5(123))
console.log(CryptoJS.MD5(123).toString())
console.log(md5(Math.random() * 1000 + time).toString())

