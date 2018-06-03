exports.findAll = function (id) {
    var promise = new Promise(function (resolve, reject) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'aniknow'
    });
    connection.connect();
    connection.query(
        'SELECT * FROM animalInfo WHERE id='+id,
        function selectCb(err, results) {
            if (results) {
                //console.log(results);
                resolve(results);
            }
            if (err) {
                console.log(err);
            }
            connection.end();
        }
    );
});
promise.then(function (value) {
    console.log(value);
    return value;
    // success
}, function (value) {
    // failure
});
return promise;
};






