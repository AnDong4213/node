var router = require('koa-router')();
var formidable = require('formidable');
router.prefix('/home');

let User = require('../models/UserModel');
let Msg = require('../models/MsgModel');

router.get('/', function *(next) {
    let loginbean = this.session.loginbean;
    // let beRejected = yield User.findOne({_id: loginbean.id});
    this.state.loginbean = loginbean;
    if (loginbean.role == 0) {
        this.body = "<script>alert('您无权访问此页面');location.href='/'</script>";
        return;
    };
    yield User.update({_id: loginbean.id}, {$set: {msgnum: 0}});
    loginbean.msgnum = 0;
    this.session.loginbean = loginbean;
    this.state.loginbean = loginbean;
    let msgRs = yield Msg.find({to: loginbean.id});
    yield this.render('home', {msgrs: msgRs})
});

router.get('/apply', function *(next) {
  yield this.render('apply', {})
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
        teacher.photopath= (files.photo.path).replace('public\\','');
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

router.post('/apply', function* (next) {
    var loginbean = this.session.loginbean;
    if (!loginbean) {
        this.body = '<script>alert("登录过期，请重新登录...");location.href="/"</script>'
    };
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = "./public/images";
    form.keepExtensions = true;
    form.maxFieldsSize = 5 * 1024 * 1024;
    var rs = yield upload(this.req, form);  // 不会产生异步...
    var res = yield insertTeacher(loginbean, rs.fields, rs.files);
    this.session.loginbean.role = 2;
    this.body = res;
})

module.exports = router;

/*{ realname: 'ffff', idnumber: 'ffff', accept: '1', preview: 'cc' } console.log(fields);
TIM截图20180505213953.png     console.log(files.photo.name);
public\images\upload_953d582aaa165a55494f98bc2bb287d0.png*/    // console.log(files.photo.path);
