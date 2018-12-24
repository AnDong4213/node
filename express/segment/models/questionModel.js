var connPool = require('./ConnPool');
var async = require('async');

module.exports = {
    ask: function(req, res) {
        let loginbean = req.session.loginbean;
        let pool = connPool();
        pool.getConnection(function(err, conn) {
            var userAddSql = 'insert into question (typeid,typename,title,content,uid,nicheng,updtime,createtime) values (?,?,?,?,?,?,current_timestamp,current_timestamp)';
            switch (req.body['typeid']) {
                case '1': 
                    req.body['typename'] = 'javascript';
                    break;
                case '2': 
                    req.body['typename'] = 'php';
                    break;
                case '3': 
                    req.body['typename'] = 'pathon';
                    break;
                case '4': 
                    req.body['typename'] = 'java';
                    break;
                case '5': 
                    req.body['typename'] = 'mysql';
                    break;
                case '6': 
                    req.body['typename'] = 'ios';
                    break;
                case '7': 
                    req.body['typename'] = 'android';
                    break;
                case '8': 
                    req.body['typename'] = 'node.js';
                    break;
                case '9': 
                    req.body['typename'] = 'html5';
                    break;
                default:
                    req.body['typename'] = 'linux';
            }
            var param = [req.body['typeid'],req.body['typename'],req.body['title'],req.body['content'],loginbean.id,loginbean.nicheng];
            conn.query(userAddSql, param, function(err,rs) {
                if(err){
                    res.send("数据库错误,错误原因: " + err.message);
                    return;
                }
                res.send('<script>alert("提问成功");location.href="../";</script>');
                // res.redirect('../');
            });
            conn.release();
        })
    },
    queList: function(req, res, loginbean) {
        let pool = connPool();
        pool.getConnection(function(err, conn) {
            if (err) {
                res.send("获取连接错误,错误原因:"+err.message);
                return;
            };

            let page = 1;
            if (req.query['page'] != undefined) {
                page = parseInt(req.query['page']);
                if (page < 1) {
                    page = 1;
                }
            }
            let pageSize = 2;
            let pointStart = (page - 1) * pageSize;
            let count = 0, countPage = 0;

            let countSql = 'select count(*) as count from question';
            let listSql = 'select qid,title,looknum,renum,finished,updtime,createtime from question order by qid desc limit ?,?';
            let param = [pointStart, pageSize];

            async.series({
                one: function(callback) {
                    conn.query(countSql, [], function(err, rs) {
                        count = rs[0]['count'];
                        countPage = Math.ceil(count/pageSize);
                        if (page > countPage) {
                            page = countPage;
                            pointStart = (page - 1) * pageSize;
                            param = [pointStart, pageSize];
                        }
                        callback(null, rs);
                    })
                },
                two: function(callback) {
                    conn.query(listSql, param, function(err, rs) {
                        callback(null, rs);
                    })
                }
            }, function(err, results) {
                let rs  = results['two'];
                res.render('index', {
                    name: '张三',
                    loginbean,
                    rs,
                    page,
                    count,
                    countPage
                })
            })
            conn.release();
        })
    },
    queDetail: function(req, res, loginbean) {
        let qid = req.query['qid'];
        if (qid != undefined) {
            let sqlupd = 'update question set looknum=looknum+1 where qid=?';
            let sqldetail = 'select qid,title,content,uid,nicheng,looknum,renum,finished,updtime,createtime from question where qid=?';
            let param=[qid];
            let pool = connPool();
            pool.getConnection(function(err, conn) {
                if(err) {
                    res.send("获取连接错误,错误原因:"+err.message);
                    return;
                }
                async.series({
                    one: function(callback) {
                        conn.query(sqlupd, param, function(err, rs) {
                            callback(null, rs);
                        })
                    },
                    two: function(callback) {
                        conn.query(sqldetail, param, function(err, rs) {
                            callback(null, rs);
                        })
                    }
                }, function(err, results) {
                    let rs = results['two'];
                    console.log(rs)
                    res.render('queDetail', {
                        name: '张三',
                        rs,
                        loginbean
                    })
                })
            })
        } else {
            res.send('没传入qid...');
        }
    }
}



