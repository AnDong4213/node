let express = require('express');
let fs = require('fs');
let app = express();
let path = require('path');

let bodyParser = require('body-parser'); // body-parser - node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。
let multer = require('multer'); // multer-node.js 中间件，用于处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据。

// 创建 application/x-www-form-urlencoded编码解析
// let urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));

app.get('/upload.html', function (req, res) {
    res.sendFile(path.resolve('upload.html'));
})

app.post('/file_upload', (req, res) => {
  if (req.url != '/favicon.ico') {
    var des_file = path.join(__dirname, './upload/') + req.files[0].originalname;

    // console.log(des_file); // D:\node\runoob\upload\weix.png
    // console.log(path.resolve(__dirname, './upload/') + req.files[0].originalname)  // D:\node\runoob\uploadweix.png

    console.log(req.files);  // 上传的文件信息
    /* fs.readFile(req.files[0].path, function (err, data) {
      fs.writeFile(des_file, data, function (err) {
        if ( err ) {
          console.log( err );
        } else {
          response = {
            message:'File uploaded successfully',
            filename:req.files[0].originalname
          };
          fs.unlinkSync(req.files[0].path);  // 删除临时文件夹中的图片
        }
        console.log(response);
        res.end(JSON.stringify(response));
      });
    }); */

    let fileReadStream = fs.createReadStream(req.files[0].path);
    let writeReadStream = fs.createWriteStream(des_file);
    fileReadStream.pipe(writeReadStream);
    writeReadStream.on('finish', () => {
      console.log('finish');
      fs.unlinkSync(req.files[0].path);
      res.send('拷贝完毕')  
    })

  }
})
  
var server = app.listen(8081, function () {
  
   var host = server.address().address
   var port = server.address().port
  
   console.log(port);
   console.log(host);
})

// console.log(req.files);
/* [ { fieldname: 'image',
    originalname: 'ali2.png',
    encoding: '7bit',
    mimetype: 'image/png',
    destination: '/tmp/',
    filename: '16ef270d1096294a47c0b56a318c8680',
    path: '\\tmp\\16ef270d1096294a47c0b56a318c8680',
    size: 91054 } ] */














