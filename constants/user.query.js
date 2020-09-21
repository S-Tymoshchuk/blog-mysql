const bcrypt = require("bcryptjs");
const query = require("../mysql/mysql");
const {
  createToken
} = require('../utils/auth');
const AppError = require('../utils/AppError')

const correctPassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

exports.createUser = async (data) => {
  data.pass = await bcrypt.hash(data.pass, 12);
  const value = Object.values(data);
  const sql = `INSERT INTO users(name, email, pass, role) VALUES(?,?,?,?)`;
  return await query(sql, value, data);
};

exports.login = async (user) => {
  const sql = `SELECT * FROM users WHERE email = ?`;
  const result = await query(sql, user.email);
  const checkPassword = await correctPassword(user.password, result[0].pass);
  const token = await createToken(result[0].id);
  if (checkPassword) return token;
  return new AppError('Incorrect password');
};

exports.findUser = async (id) => {
  const sql = 'SELECT * FROM `users` WHERE `id` = ? '
  return await query(sql, id)
}