var express = require('express');
var router = express.Router();
var userModel = require('../models/UserModel');

router.all('/login', (req,res) => {
  let subflag = req.body['subflag'];
  if (subflag == undefined) {
    res.render('login', {})
  } else {
    // console.log(subflag)
    userModel.login(req,res);
  }
})

// 4.x已弃用 req.param()
/* router.post('/zhuce', (req,res) => {
  let nicheng = req.param('nicheng');
  console.log(nicheng)
  res.send('注册');
}) */

// <form method="post" action="./users/zhuce/haha">  get也行
/* router.post('/zhuce/:id', function(req, res) {  
  console.log("bbbbbbbb=" + req.params.id);  // bbbbbbbb=haha
  res.send('注册');
}) */

/* router.get('/zhuce', (req,res) => {   // 只接受get和地址栏传来的参数  
  let nicheng = req.query['nicheng']
  console.log(nicheng)
  res.send('注册');
}) */

router.post('/zhuce', (req,res) => {   // 只接受post传来的参数 
  // let nicheng = req.body['nicheng']
  userModel.zhuce(req,res);
  // res.send('注册');  // 不能出现两次...
})

module.exports = router;



/* router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  // res.render('users', { title: '我是用户...' });
}); */
/* router.get('/list_user', (req, res) => {
  console.log('GET 请求的...');
  res.send('用户列表界面...')
})
router.post('/', (req, res) => {
  console.log('主页 POST 请求');
  res.send('Hello Post');
})
router.all('/all', (req, res) => {
  console.log('POST, GET请求全部接收...');
  res.send('Hello,POST,GET');
}) */