const PetinfoModel = require('../models/PetinfoModel');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

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
    let rs;
    if (fields.flag) {
      fields.updtime = new Date();
      let pet = {id: fields.id, uid: loginbean.id};
      let rsimg = await PetinfoModel.findOne({where: pet});
      let road = path.join(__dirname, '../public/', rsimg.petimg);
      fs.unlink(road, (err) => {
        if (err) {
          return console.error(err);
        };
      });
      rs = await PetinfoModel.update(fields, {where: pet});
      if (rs[0] == 1) {
        ctx.body = {
          flag: 'ok'
        }
      }
    } else {
      fields.uid = loginbean.id;
      fields.updtime = new Date();
  	  fields.createtime = new Date();
      rs = await PetinfoModel.create(fields);
      ctx.body = rs;
    }
  }

  async mypetinfo(ctx) {
    let loginbean = ctx.session.loginbean;
    if (loginbean) {
      let pet = {uid: loginbean.id};
      let count = await PetinfoModel.count({where: pet});
      let page = 1;
      if (ctx.query.page) {
        page = ctx.query.page;
      };
      let pageSize = 4;
      let rs = await PetinfoModel.findAll({where: pet, offset: (page-1)*pageSize, limit: pageSize});
      ctx.body = [count, rs];
    } else {
      ctx.body = 'loginExpired';
    }
  }

  async delpetInfo(ctx) {
    let loginbean = ctx.session.loginbean;
    if (loginbean) {
      let pet = {id: ctx.query.id, uid: loginbean.id};
      let rsimg = await PetinfoModel.findOne({where: pet});
      let road = path.join(__dirname, '../public/', rsimg.petimg);
      /*let del = await new Promise((resolve, reject) => {
        fs.unlink(road, (err) => {
          if (err) {
            return console.error(err);
          };
          resolve('ok')
        });
      })*/
      fs.unlink(road, (err) => {
        if (err) {
          return console.error(err);
        };
      });
      let rs = await PetinfoModel.destroy({where: pet});
      if (rs == 1) {
        ctx.body = {
          result: true
        }
      } else {
        ctx.body = {
          result: false
        }
      }
    }
  }

}

exports.service = PetService
