var net = require('net');
var chatServer = net.createServer(), clientMap = new Object();
var ii = 0;

chatServer.on('connection', function(client) {
    console.log('我连上了...');
    client.name = ++ ii;
    clientMap.name = client;

    client.on('data', function(data) {
        console.log('客户端: ' + data);
        broadcast(data, client);
    })

    client.on('error', function(exception) {
        console.log('客户端错误: ' + exception);
        client.end();
    })

    client.on('close', function(data) {
        delete clientMap[client.name];
        console.log(client.name + '下线了...');
        broadcast(client.name + '下线了', client);
    })

})

function broadcast(message, client) {
    for (var key in clientMap) {
        clientMap[key].write(client.name + '--say:' + message + '\n');
    }
}
chatServer.listen(9000);








