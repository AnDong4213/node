/* module.exports = (function() {
    var _value = 1;
    return function() {
        console.log('必报:'+ _value++)
    }
})(); */

let mysql = require('mysql');

module.exports = (function() {
    let pool = mysql.createPool({
        host: 'localhost',
        user: 'zad',
        password: '123456',
        database: 'segment',
        port: '3306'
    });
    pool.on('connection', function(connection){
        connection.query('SELECT 1 + 1 AS solution');
    })
    return function() {
        return pool;
    }
})();















