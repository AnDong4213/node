let connPool = require('./ConnPool');
var LoginBean = require('../jsbean/LoginBean');

module.exports = {
    zhuce: function(req, res) {
        let pool = connPool();
        // 从pool中获取连接(异步,取到后回调) 
        pool.getConnection(function(err, conn) {
            if (err) {
                res.send('获取连接错误，错误原因:' + err.message);
                return;
            }
            let userAddSql = 'insert into user (email,pwd,nicheng,updtime,createtime) values (?,?,?,current_timestamp,current_timestamp)';
            let param = [req.body['email'],req.body['pwd'],req.body['nicheng']];
            conn.query(userAddSql, param, function(err, rs) {
                if (err) {
                    // res.send('注册错误，错误原因:' + err.message);
                    let errStr = err.message, sendStr = '<script>';
                    if (errStr.indexOf('emailuniq') > -1) {
                        sendStr += 'alert("email重复");';
                    } else if (errStr.indexOf('nichenguiq') > -1) {
                        sendStr += 'alert("昵称重复");';
                    } else {
                        sendStr += 'alert("数据库异常，稍后再试...");';
                    }
                    sendStr += 'history.back();</script>';
                    res.send(sendStr);
                    return;
                }
                // res.send('<script>alert("注册成功");window.location.href="/";</script>');
                res.redirect(307, './login');  // './login'里的.不能省略...
            })
            conn.release();
        })
    },
    login: function(req, res) {
        let pool = connPool();
        pool.getConnection(function(err, conn) {
            if (err) {
                res.send('获取连接错误，错误原因:' + err.message);
                return;
            };
            let userSql = 'select uid,nicheng from user where email=? and pwd=?';
            let param = [req.body['email'],req.body['pwd']];
            conn.query(userSql, param, function(err, rs) {
                if (err) {
                    res.send('数据库错误，错误原因:' + err.message);
                    return;
                }
                // console.log(rs);   // [ RowDataPacket { uid: 2, nicheng: 'aa' } ]
                if (rs.length > 0) {
                    let loginbean = new LoginBean();
                    loginbean.id = rs[0].uid;
                    loginbean.nicheng = rs[0].nicheng;
                    req.session.loginbean = loginbean;
                    let targeturl =  req.body['targeturl'];
                    res.redirect(targeturl);
                    // res.redirect('/');
                } else {
                    res.send('email/密码错误...')
                }
            })
            conn.release();
        })
    }
}
 













