const router = require('koa-router')();
const formidable = require('formidable');
router.prefix('/home');

let User = require('../models/UserModel');

router.get('/', async (ctx, next) => {
    let loginbean = ctx.session.loginbean;
    ctx.state.loginbean = loginbean;
    if (loginbean.role == 0) {
        ctx.body = "<script>alert('您无权访问此页面');location.href='/'</script>";
        return;
    }
  await ctx.render('home', {})
});

router.get('/apply', async (ctx, next) => {
  await ctx.render('apply', {})
});

function upload(req, form) {
    return new Promise((resolve, reject) => {
        form.parse(req, function(err, fields, files) {
            if (err) {
                console.log(err);
                return;
            };
            resolve({fields, files});
        });
    })
}
// mongoDB不支持事物处理，也不支持主外键关联
function insertTeacher(loginbean, fields, files) {
    return new Promise((resolve, reject) => {
        var teacher = {};
        teacher.role = 2;
		teacher.realname = fields.realname;
		teacher.idnumber = fields.idnumber;
        teacher.preview = fields.preview;
		teacher.photoname = files.photo.name;
        teacher.photopath=(files.photo.path).replace('public\\','');
        // User.update({_id: loginbean.id}, {$set: {teacher}}, function(err, rs) {  // 插入不到数据库，但也不报错...
        User.update({_id: loginbean.id}, {$set: teacher}, function(err, rs) {
            if (err) {
                console.log(err);
                return;
            };
            resolve('成功哈...');
        });
    })
}

router.post('/apply', async (ctx, next) => {
    var loginbean = ctx.session.loginbean;
    if (!loginbean) {
        ctx.body = '<script>alert("登录过期，请重新登录...");location.href="/"</script>'
    };
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = "./public/images";
    form.keepExtensions = true;
    form.maxFieldsSize = 5 * 1024 * 1024;
    var rs = await upload(ctx.req, form);  // 不会产生异步...
    var res = await insertTeacher(loginbean, rs.fields, rs.files);
    ctx.session.loginbean.role = 2;
    ctx.body = res;
})

module.exports = router;

/*{ realname: 'ffff', idnumber: 'ffff', accept: '1', preview: 'cc' } console.log(fields);
TIM截图20180505213953.png     console.log(files.photo.name);
public\images\upload_953d582aaa165a55494f98bc2bb287d0.png*/    // console.log(files.photo.path);
