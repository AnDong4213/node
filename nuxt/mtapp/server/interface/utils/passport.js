import passport from 'passport'
import LocalStrategy from 'passport-local'
import UserModel from '../../dbs/models/users'

passport.use(new LocalStrategy(async (username, password, done) => {
  // The local authentication strategy authenticates users using a username and password. The strategy requires a verify callback, which accepts these credentials and calls done providing a user.
  // 本地身份验证策略使用用户名和密码对用户进行身份验证。该策略需要 ((验证回调，它接受这些凭证，并在提供用户时调用))

  // axios.post('users/signin', {username, password})  // 这个new LocalStrategy有接收参数的功能...
  // console.log(username, 'username')  //  先运行...
  // 相比于 return Passport.authenticate('local', function(err, user, info, status) {  这个先运行
  let where = {
    username
  };
  let result = await UserModel.findOne(where);
  let resultC = JSON.parse(JSON.stringify(result))  // 如果不这样写，result.haha是无效的...
  if (resultC !== null) {
    if (resultC.password === password) {
      resultC.haha = 'haha';
      // console.log(resultC, 'result')
      return done(null, resultC)
    } else {
      return done(null, false, '密码错误')
    }
  } else {
    return done(null,false,'用户不存在')
  }
}));

// 用户每次进来时，自动的通过session去验证...http通信是没有状态的   从cookie中把session的信息提出来，跟服务端的session做验证对比..

//  用户验证成功登录后，把用户的数据存储到session中
passport.serializeUser(function(user, done){
  // console.log(user, 'passport1.js')
  done(null, user)
})

// 在每次请求的时候，会从session中读取用户对象
passport.deserializeUser(function(user, done){
  // console.log(user, 'passport2.js')
  return done(null, user)
})

export default passport

