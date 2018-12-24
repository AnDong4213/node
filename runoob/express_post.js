let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let path = require('path');

// 创建 application/x-www-form-urlencoded编码解析
let urlencodedParser = bodyParser.urlencoded({extended: false});

app.get('/post.html', function (req, res) {
    res.sendFile(path.resolve('post.html'));
 })

app.post('/process_post', urlencodedParser, (req,res) => {
  if (req.url != '/favicon.ico') {
    var response = {
      "first_name": req.body.first_name,
      "last_name": req.body.last_name
    };
    res.writeHead(200, {'Content-Type': 'text/plain;charset=utf8'});
    console.log(response);
    res.end(JSON.stringify(response));
  }
})
  
var server = app.listen(8081, function () {
  
   var host = server.address().address
   var port = server.address().port
  
   console.log(port);
   console.log(host);
})















