  1.全局安装：npm install -g express    
注：如果出现版本问题:express不是内部或外部命令    
执行：npm install -g express-generator    
测试安装：express -h命令可以列出全部命令    
    
2.www/nodejs文件夹下创建项目    
express -e segment    
//  warning: option `--ejs' has been renamed to `--view=ejs'
cd segment    
打开package.json   

1. // 4.x已弃用 req.param()
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






