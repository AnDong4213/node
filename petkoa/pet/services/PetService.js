const PetinfoModel = require('../models/PetinfoModel');
const formidable = require('formidable');

class PetService {
  async subpetInfo(ctx) {
    let loginbean = ctx.session.loginbean;
  	let form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';        //设置编辑
    form.uploadDir = './public/images/petimgs';     //设置上传目录 文件会自动保存在这里
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize = 5 * 1024 * 1024 ;   //文件大小5M
    let fields = await new Promise((resolve, reject) => {
      form.parse(ctx.req, function (err, fields, files) {
        if (err) {
            console.log(err);
            resolve('0');
            return;
        };
        if (files.petimg.size > 0) {
          fields.petimg = files.petimg.path.replace('public','');
          resolve(fields);
        } else {
          fields.petimg = '';
		      resolve(fields);
        }
      })
    });
    fields.uid = loginbean.id;
    fields.updtime = new Date();
	  fields.createtime = new Date();
    // console.log(fields);
    let rs = await PetinfoModel.create(fields);
    ctx.body = rs;
  }

  async mypetinfo(ctx) {
    let loginbean = ctx.session.loginbean;
    if (loginbean) {
      let pet = {uid: loginbean.id};
      let rs = await PetinfoModel.findAll({where: pet});
      ctx.body = rs;
    } else {
      ctx.body = 'loginExpired';
    }
  }

}

exports.service = PetService
