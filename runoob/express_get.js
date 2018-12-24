let express = require('express');
let app = express();
let path = require('path');

app.use(express.static('public'));
app.get('/get.html', function (req, res) {
    res.sendFile(path.resolve('get.html'));
 })

app.get('/process_get',(req,res) => {
  if (req.url != '/favicon.ico') {
    var response = {
      "first_name":req.query.first_name,
      "last_name":req.query.last_name
    };
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















