const formidable = require('formidable');

class OtherService {

  async form(ctx) {
    let loginbean = ctx.session.loginbean;
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = './public/images/other';
    form.keepExtensions = true;
    form.multiples = true;
    form.maxFieldsSize = 200 * 1024 * 1024 ;
    // console.log(ctx.get('authorization')); // 获取设置上传的请求头部信息...
  	let fields = await new Promise((resolve, reject) => {
        form.parse(ctx.req, function (err, fields, files) {
          if (err) {
              console.log(err);
              resolve('0');
              return;
          };
      		// console.log(files);
          resolve(fields);
        })
    });
    console.log(fields);

  	ctx.body = fields;
  }

  async ajax(ctx) {
    let loginbean = ctx.session.loginbean;
    ctx.body = loginbean;
  }

}

exports.service = OtherService
