const SayImgModel = require('../models/SayImgModel');
const SayModel = require('../models/SayModel');
const sequelize = require('../models/ModelHeader');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

class SayService {

  async subSay(ctx) {
    let loginbean = ctx.session.loginbean;
  	let form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';        //设置编辑
    form.uploadDir = './public/images/petphotos';     //设置上传目录 文件会自动保存在这里
    form.keepExtensions = true;     //保留后缀
    form.multiples = true;
    form.maxFieldsSize = 5 * 1024 * 1024 ;   //文件大小5M
    let fields = await new Promise((resolve, reject) => {
      form.parse(ctx.req, function (err, fields, files) {
        if (err) {
            resolve('0');
            return;
        };
        fields.imgArr = [];
        let len = files.petimg.length;
        for (let i = 0; i < len; i++) {
          if (files.petimg[i].size > 0) {
            let imgpath = files.petimg[i].path.replace('public','');
            let sayImg = { imgpath };
		        fields.imgArr.push(sayImg);
          } else {
            let road = path.join(__dirname, '../', files.petimg[i].path);
            fs.unlink(road, (err) => {
              if (err) {
                console.error(err);
              };
            });
          }
        }
        resolve(fields);
      })
    });
    fields.uid = loginbean.id;
    fields.updtime = new Date();
    fields.createtime = new Date();
    let transaction = await sequelize.transaction();

    try {
      let sayRs = await SayModel.create(fields, {transaction});
      let imgArr = fields.imgArr;
      for (let i = 0;i < imgArr.length; i++) {
          imgArr[i].uid = loginbean.id;
  		    imgArr[i].sayid = sayRs.null;
          await SayImgModel.create(imgArr[i], {transaction});
      }
      transaction.commit();
    } catch(err) {
      console.log(err);
      transaction.rollback();
      ctx.body = '数据库错误...';
      return;
    }
    ctx.body = {
      result: 'ok'
    };
  }




}

exports.service = SayService
