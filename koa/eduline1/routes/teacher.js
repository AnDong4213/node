var router = require('koa-router')();
router.prefix('/teacher');

var formidable = require('formidable');
var Course = require('../models/CourseModel');
var Chapter = require('../models/ChapterModel');
// var deepClone = require('../models/tool');  // 研究

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
    let page = 1, pageSize = 3, total = yield Chapter.count({courseid: cid, uid: loginbean.id});
    let totalPage = parseInt(Math.ceil(total/pageSize));
    let cpage = parseInt(this.request.query['page']);
    let url = '/teacher/chapter?cid='+cid+'&courseName='+courseName;
    if (cpage) {
        if (cpage > totalPage) {
            page = totalPage;
        } else if (cpage < 1) {
             page = 1
        } else {
            page = cpage
        }
    };
    let startPoint = (page - 1) * pageSize;
    let rs = yield Chapter.find({courseid: cid, uid: loginbean.id}).skip(startPoint).limit(pageSize);

    let hihi = JSON.parse(JSON.stringify(rs));
    hihi.map((item, index) => {
      item.logoimg = item.content.substring(3, item.content.indexOf('/>') + 2);
      return item;
    });
    yield this.render('chapter', {
        courseName,
        id: cid,
        chapterRs: hihi,
        totalPage,
        page: parseInt(page),
        url
    });
})

router.get('/delChapter',function *(next) {
      let loginbean = this.session.loginbean;
      this.state.loginbean = loginbean;
      let id = this.request.query['id'];
      let cid = this.request.query['cid'];
      let courseName = this.request.query['courseName'];
      let rs = yield Chapter.remove({_id: id, uid: loginbean.id});
      // this.redirect("./chapter?cid=" + cid + "&courseName=" + courseName);
      // this.body = '看看';
      this.status = 307;
      this.redirect("../chapter?cid=" + cid + "&courseName=" + courseName);
});

router.get('/getChapter',function *(next) {
      let loginbean = this.session.loginbean;
      this.state.loginbean = loginbean;
      let id = this.request.query['id'];
      let rs = yield Chapter.findOne({_id:id,uid:loginbean.id});
      this.body = rs;
});

router.post('/updChapter',function *(next) {
  let loginbean = this.session.loginbean;
  this.state.loginbean = loginbean;
  let id = this.request.body['chapterid'];
  let chapter = {
      title: this.request.body['title'],
      content: this.request.body['content']
  };
  let rs = yield Chapter.update({_id:id,uid:loginbean.id},{$set: chapter});
  let myurl = this.request.body['myurl'];
  this.redirect(myurl);
});

router.post('/newChapter', function *(next) {
    let loginbean = this.session.loginbean;
    this.state.loginbean = loginbean;
    let chapter = new Chapter({
        title: this.request.body['title'],
        content: this.request.body['content'],
        courseid: this.request.body['courseid'],
        uid: loginbean.id,
        logoimg: 'placeholder'
    });
    yield chapter.save();
    // console.log(rs._id);
    let myurl = this.request.body['myurl'];
    this.redirect(myurl);
})

router.get('/reqReview',function *(next) {
      let loginbean = this.session.loginbean;
      this.state.loginbean = loginbean;
      let id = this.request.query['id'];
      let rs = yield Course.update({_id: id, uid: loginbean.id},{$set:{status:1}});
      this.redirect('./course');
});

module.exports = router;
