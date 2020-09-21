module.exports = {
  mysqlConnect: {
    host: 'localhost',
    user: 'admin',
    password: '1510',
    database: 'blog',
    port: '3306'
  },
  jwtOptions: {
    jwt_secret: 'secret',
    jwt_expires: '90d'
  }
};