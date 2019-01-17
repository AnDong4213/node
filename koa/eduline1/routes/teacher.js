var router = require('koa-router')();
router.prefix('/teacher');

var formidable = require('formidable');
var Course = require('../models/CourseModel');
var Chapter = require('../models/ChapterModel');

router.get('/course', function *(next) {
    let loginbean = this.session.loginbean;
    this.state.loginbean = this.session.loginbean;
    if (loginbean) {
        let courseRs = yield Course.find({uid: loginbean.id});
        yield this.render('course', {courseRs});
    }
});

router.get('/newCourse', function *(next) {
    this.state.loginbean = this.session.loginbean;;
    yield this.render('newCourse', {});
});

router.post('/newCourse', function *(next) {
    let loginbean = this.session.loginbean;
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = "./public/images/courselogo";
    form.keepExtensions = true;  //保留后缀
    form.maxFieldsSize = 5 * 1024 * 1024;
    let that = this;
    let rs = yield (new Promise((resolve, reject) => {
        form.parse(that.req, (err, fields, files) => {
            if (err) {
                console.log(err);
                reject('上传出错');
            };
            let course = new Course({
                title: fields.title,
                type: fields.type,
                brief: fields.brief,
                logo: (files.clogo.path).replace('public\\', ''),
                uid: loginbean.id,
                uname: loginbean.nicheng,
                status: 0,
                pubtime: new Date
            });
            course.save((err, rs) => {
                if (err) {
                    reject('数据库错误' + err);
                    return;
                };
                resolve('<script>alert("创建课程成功");location.href="/teacher/course";</script>');
            })
        })
    }))
    this.body = rs;
});

router.get('/chapter', function *(next) {
    // console.log(this.query);  // 都行
    let loginbean = this.session.loginbean;
    this.state.loginbean = loginbean;
    let courseName = this.request.query['courseName'];
    let cid = this.request.query['cid'];
    //---------查出章节列表-----------------
    let rs = Chapter.find({courseid: cid, uid: loginbean.id});
    yield this.render('chapter', {
        courseName,
        id: cid,
        chapterRs: rs
    });
})

router.post('/newChapter', function *(next) {
    let loginbean = this.session.loginbean;
    this.state.loginbean = loginbean;
    let chapter = new Chapter({
        title: this.request.body['title'],
        content: this.request.body['content'],
        courseid: this.request.body['courseid'],
        uid: loginbean.id
    });
    yield chapter.save();
    // console.log(rs._id);
    let myurl = this.request.body['myurl'];
    this.redirect(myurl);
})

module.exports = router;
