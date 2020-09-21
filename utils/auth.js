const jwt = require('jsonwebtoken');
const config = require('../config');

const signToken = (id) => {
  return jwt.sign({
    id
  }, config.jwtOptions.jwt_secret, {
    expiresIn: config.jwtOptions.jwt_expires
  })
}

exports.createToken = (id) => {
  const token = signToken(id)
  return token;
}