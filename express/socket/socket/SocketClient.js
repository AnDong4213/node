var net = require('net'), port = 9000, host = '127.0.0.1';

var client= new net.Socket();
client.setEncoding('UTF-8');

//连接到服务端
client.connect(port,host,function(){
    client.write('你好');
});

client.on('data',function(data){
    console.log('服务端传来:'+ data);
    say();
});
client.on('error',function(error){
    console.log('error:'+error);
    //client.destory();

});
client.on('close',function(){
    console.log('Connection closed');
});

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function say(){
    rl.question('请输入： ', (inputStr) => {
        if (inputStr!='bye') {
            client.write(inputStr+'\n');
            say();
        } else {
            client.destroy();     //关闭连接
            rl.close();
        }
    });
}    











