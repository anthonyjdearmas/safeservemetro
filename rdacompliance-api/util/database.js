const mysql = require('mysql2');
global.env =  require('secure-env')({secret:'ccc123'});

let pool;

if (global.env.NODE_ENV === 'dev') {
  pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: global.env.DATABASE_NAME,
    password: global.env.DATABASE_PASSWORD,
  });
} else {
  pool = mysql.createPool({
    host: global.env.DATABASE_HOST,
    user: global.env.DATABASE_USER,
    database: global.env.DATABASE_NAME,
    password: global.env.DATABASE_PASSWORD,
  });
}

module.exports = pool.promise();
