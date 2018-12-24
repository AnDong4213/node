/* var net = require('net');
var client = net.connect({port: 8080}, function() {
   console.log('连接到服务器！');  
});
client.on('data', function(data) {
   console.log(data.toString());
   client.end();
});
client.on('end', function() { 
   console.log('断开与服务器的连接');
}); */


let http = require('http');

let options = {
   host: 'localhost',
   port: 8081,
   path: '/index.html'
}
let req = http.request(options, (response) => {
   let body = '';
   response.on('data', data => {
      body += data;
   })
   response.on('end',() => {
      console.log(body);
   })
})
req.end()











