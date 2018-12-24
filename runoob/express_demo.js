let express = require('express');
let app = express();
let path = require('path');

app.get('/index.html', (req,res) => {
    // console.log(req.url == req.originalUrl); // true
    // console.log(req.app);
    console.log(`req.url-----${req.url}`);
    console.log(`req.baseUrl获取路由当前安装的URL路径--${req.baseUrl}`)
    console.log(`req.body获得「请求主体」--${req.body}`)
    console.log(`req.fresh判断请求是否还「新鲜」--${req.fresh}`)
    console.log(`req.hostname/ip获取主机名和IP地址--${req.hostname}--${req.ip}`)
    console.log(`req.originalUrl获取原始请求URL--${req.originalUrl}`)
    console.log(`req.params获取路由的parameters--${req.params}`)
    console.log(req.params)
    console.log(`req.path获取请求路径--${req.path}`)
    console.log(`req.protocol获取协议类型--${req.protocol}`)
    console.log(`req.query获取URL的查询参数串--${req.query}`)
    console.log(req.query)
    console.log(`req.route获取当前匹配的路由--${req.route}`)
    console.log(req.route)
    console.log(`req.subdomains获取子域名--${req.subdomains}`)
    console.log(`req.accepts()检查可接受的请求的文档类型--`)
    console.log(req.accepts())
    // console.log(`返回指定字符集的第一个可接受字符编码--${req.acceptsCharsets}`)
    // console.log(`获取指定的HTTP请求头--${req.get()}`)
    console.log(`req.is()判断请求头Content-Type的MIME类型--${req.is() == 'text/html'}`)
    // console.log(path.resolve(__dirname, req.path))  // D:\index.html
    // console.log(path.resolve('index.html'));  // D:\node\runoob\index.html

    // res.send(`Hello World${Math.random()}`);
    res.type('text/html');
    res.sendFile(path.resolve('index.html'),(err, data) => {
        // console.log(data)
    })
})

let server = app.listen(8081,'127.0.0.1', () => {
    let host = server.address().address;
    let port = server.address().port;

    console.log(server.address());
    // console.log(host, port);
})





























