let http = require('http');

let PORT = 8000;
let serverHandle = require('../app');

let server = http.createServer(serverHandle);

server.listen(PORT);




