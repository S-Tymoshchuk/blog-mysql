const query = require('../mysql/mysql');


exports.createPost = async (data) => {
  const value = Object.values(data);
  const sql = `INSERT INTO posts(name, description) VALUES(?,?)`
  return await query(sql, value, data);
}

exports.getPosts = async () => {
  const sql = `SELECT * FROM posts`
  return await query(sql);
}

exports.updatePost = async (body, id) => {
  const data = {
    ...body,
    ...id
  }
  const value = Object.values(data);
  const sql = `UPDATE posts SET name = ?, description = ? WHERE id = ?`
  return await query(sql, value, data)
}

exports.deletePost = async (id) => {
  const sql = `DELETE FROM posts WHERE ?`
  return await query(sql, id)
}