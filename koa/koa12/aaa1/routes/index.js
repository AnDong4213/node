var router = require('koa-router')();

router.get('/', function *(next) {

  /* let rs = yield new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('执行setTimeout');
      resolve('返回结果...');
    }, 2000)
  }) */

  // 如果用reject的话，用try...catch...
  let rs = null;
  try {
    rs = yield new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('执行setTimeout');
        reject('错误hh...');
      }, 2000)
    })
  } catch(err) {
    console.log(err)
  }

  console.log('aaaaaaaaa=' + rs )
  this.body = 'hello, koa1--' + rs ;

  /* yield this.render('index', {
    title: 'Hello World Koa!'
  }); */

});

router.get('/foo', function *(next) {
  yield this.render('index', {
    title: 'Hello World foo!'
  });
});

module.exports = router;
