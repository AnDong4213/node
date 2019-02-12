const formidable = require('formidable');

class OtherService {

  async form(ctx) {
    let loginbean = ctx.session.loginbean;
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = './public/images/other';
    form.keepExtensions = true;
    form.maxFieldsSize = 200 * 1024 * 1024 ;

  	let fields = await new Promise((resolve, reject) => {
        form.parse(ctx.req, function (err, fields, files) {
          if (err) {
              console.log(err);
              resolve('0');
              return;
          };
          // console.log(files.petimg.path);
      		console.log(files);
      		console.log(fields);
          resolve(fields);
        })
    });

  	ctx.body = fields;
  }

  async ajax(ctx) {
    let loginbean = ctx.session.loginbean;
    ctx.body = loginbean;
  }

}

exports.service = OtherService
