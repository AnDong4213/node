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






