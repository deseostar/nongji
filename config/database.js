const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : '172.16.20.105',
  user     : 'root',
  password : '1',
  database : 'nongji',
  port     : '23306'
})

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

module.exports = connection;