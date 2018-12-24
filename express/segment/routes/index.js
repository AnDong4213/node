var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  let loginbean = req.session.loginbean;
  // console.log(loginbean)
  let questionModel = require('../models/questionModel');
  questionModel.queList(req,res,loginbean);
});

router.get('/logout', function(req, res) {
  req.session.destroy(function() {
    res.redirect('/');
  })
})

router.post('/uploadImg',function(req,res) {
  var form = new multiparty.Form(); 
  //设置编码 
  form.encoding = 'utf-8'; 
  //设置文件存储路径 
  form.uploadDir = "./uploadtemp/"; 
  //设置单文件大小限制 
  form.maxFilesSize = 2 * 1024 * 1024; 
  //form.maxFields = 1000;  设置所以文件的大小总和 
   
  form.parse(req, function(err, fields, files) { 
    let uploadurl='/images/upload/', file1 = files['filedata'];

    var originalFilename = file1[0].originalFilename; //原始文件名 
    var timestamp=new Date().getTime(); //获取当前时间戳 
    uploadurl += timestamp+originalFilename;

    var tmpPath = file1[0].path;  
    var newPath= './public'+uploadurl;

    var fileReadStream = fs.createReadStream(tmpPath); 
    var fileWriteStream = fs.createWriteStream(newPath); 
    fileReadStream.pipe(fileWriteStream); //管道流 
    fileWriteStream.on('finish',function(){ 
      fs.unlinkSync(tmpPath);    // 删除临时文件夹中的图片
      console.log('finish');
      res.send('{"err":"","msg":"'+uploadurl+'"}')  
    }); 
  });


}); 

/* router.get('/ab*cd', (req, res) => {
  res.send('我是首页--正则表达式...')
}) */

module.exports = router;
