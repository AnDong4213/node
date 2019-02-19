import passport from 'passport'
import LocalStrategy from 'passport-local'
import UserModel from '../../dbs/models/users'

passport.use(new LocalStrategy(async (username, password, done) => {
  let where = {
    username
  };
  let result = await UserModel.findOne(where);
  if (result !== null) {
    if (result.password === password) {
      return done(null, result)
    } else {
      return done(null, false, '密码错误')
    }
  } else {
    return done(null,false,'用户不存在')
  }
}));

// 用户每次进来时，自动的通过session去验证...http通信是没有状态的   从cookie中把session的信息提出来，跟服务端的session做验证对比..

//  用户验证成功登录后，把用户的数据存储到session中
passport.serializeUser(function(user,done){
  done(null, user)
})

// 在每次请求的时候，会从session中读取用户对象
passport.deserializeUser(function(user,done){
  return done(null, user)
})

export default passport

