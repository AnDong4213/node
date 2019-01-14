const router = require('koa-router')();
router.prefix('/admin');

let User = require('../models/UserModel');
let Msg = require('../models/MsgModel');

router.get('/', async (ctx, next) => {
  let loginbean = ctx.session.loginbean;
  ctx.state.loginbean = loginbean;
  if (loginbean.role != 0) {
      ctx.body = "<script>alert('您无权访问此页面');location.href='/'</script>";
      return;
  }
  await ctx.render('adminhome', {})
});

router.get('/teacherapplylist', async (ctx, next) => {
  let rs = await User.find({role: 2});
  await ctx.render('teacherapplylist', {rs: rs});
});

router.get('/pass', async (ctx, next) => {
    let loginbean = ctx.session.loginbean;
    if (loginbean.role == 0) {
        let id = ctx.query['id'];
        let rs = await User.update({_id: id}, {$set: {role: 3}});
        // console.log(rs);  // { n: 1, nModified: 1, ok: 1 }
        if (rs.ok) {
            ctx.body = 1;
        } else {
            ctx.body = 0;
        }
    }
})

router.get('/refuse', async (ctx, next) => {
    let loginbean = ctx.session.loginbean;
    if (loginbean.role == 0) {
        let id = ctx.query['uid'];
        let rs = await User.update({_id: id}, {$set: {role: 1}});
        if (rs.ok) {
            let msg = new Msg({
                send: loginbean.id,
                sendname: loginbean.nicheng,
                sendtime: new Date(),
                to: id
            });
            let mrs = msg.save();
            if (mrs.ok) {
                ctx.body = 1;
            } else {
                ctx.body = 2;  // 插入消息失败
            }
        } else {
            ctx.body = 0;  // 驳回失败
        }
    }
});

module.exports = router;
