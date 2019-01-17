var router = require('koa-router')();
router.prefix('/upload');
var multiparty = require('multiparty');
var fs = require('fs');

router.post('/upimg',function *(next) {
   var form = new multiparty.Form();
    //设置编码
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "./public/uploadtemp/";  //临时文件路径
    //设置单文件大小限制
    form.maxFilesSize = 2 * 1024 * 1024;
    //form.maxFields = 1000;  设置所以文件的大小总和
    let that = this;
    let rs = yield new Promise(function(resolve, reject) {
        form.parse(that.req, function(err, fields, files) {

                let uploadurl='images/upload/';    //目标路径
                let file1 = files['filedata'];

                let paraname = file1[0].fieldName;  //参数名filedata
                let originalFilename = file1[0].originalFilename; //原始文件名

                var timestamp = new Date().getTime(); //获取当前时间戳
                uploadurl += timestamp + '_' + originalFilename;

                var tmpPath = file1[0].path;   //uploads\mrecQCv2cGlZbj-UMjNyw_Bz.txt
                var newPath = './public/'+uploadurl;   //目标路径

                var fileReadStream = fs.createReadStream(tmpPath);
                var fileWriteStream = fs.createWriteStream(newPath);
                fileReadStream.pipe(fileWriteStream); //管道流
                fileWriteStream.on('close', function() {
                   fs.unlinkSync(tmpPath);    //删除临时文件夹中的图片
                   console.log('copy over');
                   resolve(uploadurl);
                });
        });
   });
   this.body = '{"err":"","msg":"/'+rs+'"}';
});

module.exports = router;
