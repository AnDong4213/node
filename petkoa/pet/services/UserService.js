const UserModel = require('../models/UserModel');

class UserService {
  async zhuce(ctx) {
    let user = {
      email: ctx.request.body['email'],
      pwd: ctx.request.body['pwd'],
      nicheng: ctx.request.body['nicheng'],
      updtime: new Date(),
      role: 0,
      createtime: new Date()
    };
    try {
      let rs = await UserModel.create(user);
      ctx.body = 1;
    } catch(err) {
      let errMsg = err.errors[0].message;
      if (errMsg.indexOf('emailuniq') > -1) {
        ctx.body = 2;
      } else if (errMsg.indexOf('nichenguniq') > -1) {
        ctx.body = 3;
      } else {
        ctx.body = '0';
      }
    }
  }
  async login(ctx) {
    let user = {
      email: ctx.request.body['email'],
      pwd: ctx.request.body['pwd']
    };
    let rs = await UserModel.findOne({where: user});
    if (rs != null) {
      let loginbean = {
        id: rs.id,
        nicheng: rs.nicheng,
        role: rs.role
      };
      ctx.session.loginbean = loginbean;
      ctx.body = loginbean;
    } else {
      ctx.body = 0;
    }
  }

}

exports.service = UserService
