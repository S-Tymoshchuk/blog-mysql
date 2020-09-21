const query = require('../mysql/mysql');

exports.createReview = async (data) => {
  const value = Object.values(data);
  const sql = `INSERT INTO reviews(userId, description, postId) VALUES(?,?,?)`
  return await query(sql, value, data)
}

exports.getReviews = async (id) => {
  const sql = `SELECT reviews.id, reviews.description, users.name
  From reviews
  JOIN users ON users.id = reviews.userID
  WHERE reviews.postID = ?;`
  return await query(sql, id.postId)
}

exports.getUpdate = async (body, id) => {
  const data = {
    ...body,
    ...id
  }
  const value = Object.values(data);
  const sql = `UPDATE reviews SET description = ?  WHERE id = ?`
  return await query(sql, value, data)
}

exports.getDelete = async (id) => {
  const sql = `DELETE FROM reviews WHERE ?`
  return await query(sql, id)
}