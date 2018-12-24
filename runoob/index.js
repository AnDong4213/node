let fs = require('fs');
let events = require('events');
let eventEmitter = new events.EventEmitter();
let http = require('http');
let url = require('url');
let util = require('util');
let querystring = require('querystring');
let os = require("os");
let path = require('path');

let dns = require('dns');

/* let data = fs.readFileSync('./input.txt');
console.log(data)
console.log(data.toString()); */

/* let str = "www.runoob.com-1234567890";
str.split('').forEach((item,index) => {
	console.log(item+'--'+item.charCodeAt(0)+'--'+index)
}) */

/* fs.readFile('./input.txt', (err,data) => {
    if (err) throw err;
    console.log(Buffer.isBuffer(data));
    console.log(data.toString());
}) */

/* var buffer1 = Buffer.from(('菜鸟教程'));
var buffer2 = Buffer.from(('www.runoob.com'));
var buffer3 = Buffer.concat([buffer1,buffer2],60);
console.log("buffer3 内容: " + buffer3.toString()); */

/* 
var connectHandler = function() {
    console.log('连接成功');
    eventEmitter.emit('data_received')
}
eventEmitter.on('data_received', () => {
    console.log('数据接收成功。');
})
// 绑定 connection 事件处理程序
eventEmitter.on('connection', connectHandler);

eventEmitter.emit('connection');
console.log("程序执行完毕。"); */

/* eventEmitter.on('error',function(err){
    console.error('Error:',err);
}); */

/* const buf = Buffer.from('runoob', 'ascii');
// 输出 72 75 6e 6f 6f 62
console.log(buf.toString('hex'));
// 输出 cnVub29i
console.log(buf.toString('base64')); */

var buf1 = Buffer.from('abcdefghijkl');
var buf2 = Buffer.from('RUNOOB');

//将 buf2 插入到 buf1 指定位置上
// buf2.copy(buf1, 2); // abRUNOOBijkl
//buf2.copy(buf1, 2,2); // abNOOBghijkl
// buf2.copy(buf1, 2,6);  // abcdefghijkl
// buf2.copy(buf1, 2,2,5); // abNOOfghijkl
// console.log(buf1.toString());

var buffer1 = Buffer.from('runoob');
// 剪切缓冲区
// var buffer2 = buffer1.slice(1,4); // uno
// var buffer2 = buffer1.slice(4);  // ob
var buffer2 = buffer1.slice(0);  // ob
// console.log(buffer2.toString());


/* let data = '';
let readerStream = fs.createReadStream('./input.txt');
readerStream.setEncoding('UTF8');
readerStream.on('data', (chunk) => {
    data += chunk;
})
readerStream.on('end', () => {
    console.log(data);
})
readerStream.on('error', function(err){
    console.log(err.stack);
 });
readerStream.on('finish', () => {
    console.log('data');
}) */


/* let data = '菜鸟教程官网地址：www.runoob.com';
let writerStream  = fs.createWriteStream('./output.txt');
writerStream .write(data,'UTF8');
writerStream.end();
writerStream.on('finish', function() {
    console.log("写入完成。");
});

writerStream.on('error', function(err){
   console.log(err.stack);
});
fs.readFile('./output.txt', (err,data) => {
    if (err) throw err;
    console.log(data.toString());
}) */

/* // 创建一个可读流
var readerStream = fs.createReadStream('input.txt');
// 创建一个可写流
var writerStream = fs.createWriteStream('output1.txt',{'flags': 'a'});
// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.pipe(writerStream);
console.log("程序执行完毕"); */


/* let http = require('http');
http.createServer((request,response) => {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Hello World');
    response.end()
}).listen(8088) */



/* var server = require("./server");
var router = require("./router");
server.start(router.route); */

/* console.log(global.process.version);
console.log( __filename );
console.log( __dirname ); */
/* v8.9.4
D:\node\runoob\index.js
D:\node\runoob */



/* console.info("程序开始执行：");
var counter = 10;
console.log("计数: %d", counter);
console.time("获取数据");

console.log(global.process.version);
console.log( __filename );
console.log( __dirname );

console.timeEnd('获取数据');

console.info("程序执行完毕。") */

//console.log(global.process == process)  // true

/* process.stdout.write("Hello World!");
console.log(process.platform)

process.argv.forEach(function(val, index, array) {
    console.log(index + ': ' + val);
 }); */

 // console.log(process.cwd() == __dirname);  // true


/* function Base() { 
    this.name = 'base'; 
    this.base = 1991; 
    this.sayHello = function() { 
        console.log('Hello ' + this.name); 
    }; 
} 
Base.prototype.showName = function() { 
    console.log(this.name);
}; 
function Sub() { 
    this.name = 'sub'; 
} 
util.inherits(Sub, Base);
var objBase = new Base();
// objBase.showName(); 
// objBase.sayHello(); 
// console.log(objBase);
var objSub = new Sub();
objSub.showName(); 
// objSub.sayHello(); 
console.log(objSub);  */

/* function Person() { 
    this.name = 'byvoid'; 
    this.toString = function() { 
        return this.name; 
    }; 
} 
var obj = new Person(); 
// console.log(util.inspect(obj)); 
console.log(util.inspect(obj, true)); */ 

/* fs.stat('./ali2.png',(err,stats) => {
    if (err) throw err; 
    console.log(stats);
    console.log(stats.isFile());
    console.log(stats.isDirectory());
}) */

/* fs.writeFile('gg.txt','我是通 过fs.writeFile 写入文件的内容',(err) => {
    if (err) throw err;
    console.log("数据写入成功！");
}) */

let buf = Buffer.alloc(50);
/* fs.open('input.txt', 'r+', function(err, fd) {
    if (err) {
        return console.error(err);
    }
   console.log("文件打开成功！");
   console.log(fd)
   fs.read(fd,buf,0, buf.length, 0,(err,bytes) => {
       if (err) throw err;
       console.log(bytes);
       console.log(buf);
       console.log(buf.slice(0, bytes).toString());
       fs.close(fd,(err) => {
           if (err) throw err;
           console.log("文件关闭成功");
       })
   })
 }); */


/* fs.unlink('./output1.txt',(err) => {
    if (err) throw err;
    console.log("文件删除成功！");
}) */

/* fs.mkdir('/node/runoob/testha',{recursive: true},(err) => {
    if (err) throw err;
    console.log("目录创建成功。");
}) */

/* fs.readdir('/node/runoob',(err,files) => {
    console.log(files)
}) */

/* fs.rmdir('/node/runoob/testha',err => {
    console.log("删除目录成功...");
}) */

/* fs.open('./output.txt', "a+", function(err, fd){
    console.log(fd)
    fs.writeFile(fd, "aabdb", function(err){
        if (err){
            return console.error(err);
        }
    });
}); */

/* http.createServer((req,res) => {
    res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
    // res.end(util.inspect(url.parse(req.url, true)));

    let params = url.parse(req.url, true).query;
    res.write("网站名：" + params.name);
    res.write("\n");
    res.write("网站 URL：" + params.url);
    res.end();

}).listen(3000) */


/* var postHTML = 
  '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
  '<body>' +
  '<form method="post">' +
  '网站名： <input name="site"><br>' +
  '网站 URL： <input name="url"><br>' +
  '<input style="color: red;" type="submit">' +
  '</form>' +
  '<h1>哈哈哈</h1>'+
  '</body></html>';
 
http.createServer(function (req, res) {
  var body = "";
  req.on('data', function (chunk) {
      console.log(chunk)
      console.log(chunk.toString())
    body += chunk;
  });
  req.on('end', function () {
    if (req.url !== '/favicon.ico') {
        // 解析参数
        body = querystring.parse(body);
        console.log(body)
        // 设置响应头部信息及编码
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
    
        if(body.site && body.url) { // 输出提交的数据
            res.write("网站名：" + body.site);
            res.write("<br>");
            res.write("网站 URL：" + body.url);
        } else {  // 输出表单
            res.write(postHTML);
        }
        res.end();
    }
  });
}).listen(3000); */


// console.log(os.networkInterfaces())

// 格式化路径
// console.log(path.normalize('/test/test1//2slashes/1slash/tab/..'))  // \test\test1\2slashes\1slash

// 用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是"/"，Windows系统是"\"。
// console.log('joint path : ' + path.join('/test', 'test1', '2slashes/1slash', 'tab', '..'));
// joint path : \test\test1\2slashes\1slash

// console.log('joint path : ' + path.join('/test', 'test1', '2slashes/1slash', 'tab', '../../'));
// joint path : \test\test1\2slashes\

// console.log('joint path : ' + path.join('/test', 'test1', '2slashes/1slash', 'tab', '.'));
// joint path : \test\test1\2slashes\1slash\tab

// path.resolve([from ...], to)   将 to 参数解析为绝对路径，给定的路径的序列是从右往左被处理的，后面每个 path 被依次解析，直到构造完成一个绝对路径
// console.log(path.resolve(__dirname, './dist')); // D:\node\runoob\dist
// console.log('resolve : ' + path.resolve('main.js'));  // resolve : D:\node\runoob\main.js

// 路径中文件的后缀名
// console.log('ext name : ' + path.extname('main.js'));  // ext name : .js


/* dns.lookup('www.taobao.com',(err, address, family) => {
    console.log('ip 地址:', address);
    dns.reverse(address, (err, hostnames) => {
        if (err) {
            console.log(err.stack);
        }
        console.log('反向解析 ' + address + ': ' + JSON.stringify(hostnames));
    })
}) */


http.createServer((request,response) => {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    if (request.url != './favicon.ico') {
        fs.readFile(pathname.substr(1), (err,data) => {
            if (err) {
                console.log(err);
                response.writeHead(404, {'Content-Type': 'text/html'})
            } else {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(data.toString())
            }
            response.end();
        })
    }
}).listen(8080)

















