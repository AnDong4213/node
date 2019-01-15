var router = require('koa-router')();
router.prefix('/teacher');

/*let User = require('../models/UserModel');
let Msg = require('../models/MsgModel');*/

router.get('/course', function *(next) {
    this.state.loginbean = this.session.loginbean;
    yield this.render('course', {});
});

router.get('/newCourse', function *(next) {
    this.state.loginbean = this.session.loginbean;
    yield this.render('newCourse', {});
});


module.exports = router;
