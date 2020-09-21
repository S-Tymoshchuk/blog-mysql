const config = require('../config');
const createTable = require('../constants/createTable');
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: config.mysqlConnect.host,
  user: config.mysqlConnect.user,
  password: config.mysqlConnect.password,
  database: config.mysqlConnect.database,
  port: config.mysqlConnect.port
});

const query = (sql, values, obj) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            if (!rows.insertId) resolve(rows)
            const data = {
              id: rows.insertId,
              ...obj
            };
            resolve(data)
          }
          connection.release()
        })
      }
    })
  })
}

let createTableFunc = (sql) => {
  return query(sql, [])
}

createTableFunc(createTable.users)
createTableFunc(createTable.posts)
createTableFunc(createTable.reviews)

module.exports = query;

// const connection = mysql.createConnection({
//   host: config.mysqlConnect.host,
//   user: config.mysqlConnect.user,
//   password: config.mysqlConnect.password,
//   database: config.mysqlConnect.database,
//   port: config.mysqlConnect.port
// })

// connection.query(createTable.users)
// connection.query(createTable.posts)
// connection.query(createTable.reviews)


// module.exports = connection;