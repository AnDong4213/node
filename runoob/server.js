let http = require('http');
let url = require('url');

function start(route) {
    function onRequest(request,response) {
        response.writeHead(200, {"Content-Type": "text/plain"});
        if (request.url != '/favicon.ico') {
            let pathname = url.parse(request.url).pathname;
            console.log("Request for-- " + pathname);
            console.log(url.parse(request.url))
            console.log(request.url)

            route(pathname)

            response.write("Hello Worldww");
            response.end();
        }
        
    }
    http.createServer(onRequest).listen(8088)
    console.log("Server has started.");
}
exports.start = start;

// console.log(url.parse(request.url))  http://www.localhost:8088/start?foo=bar&hello=world
/* let Url = {
    protocol: null,
    slashes: null,
    auth: null,
    host: null,
    port: null,
    hostname: null,
    hash: null,
    search: '?foo=bar&hello=world',
    query: 'foo=bar&hello=world',
    pathname: '/start',
    path: '/start?foo=bar&hello=world',
    href: '/start?foo=bar&hello=world' 
} */








