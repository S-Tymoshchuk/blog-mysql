exports.users = `create table if not exists users(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  email VARCHAR(20) NOT NULL,
  pass VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL,
  PRIMARY KEY ( id ),
  UNIQUE (email)
)`

exports.posts = `create table if not exists posts(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  description VARCHAR(20) NOT NULL,
  data TIMESTAMP,
  PRIMARY KEY ( id )
)`

exports.reviews = `create table if not exists reviews(
  id INT NOT NULL AUTO_INCREMENT,
  userId INT NOT NULL,
  description VARCHAR(20) NOT NULL,
  data TIMESTAMP,
  postId INT NOT NULL,
  PRIMARY KEY ( id ),
  FOREIGN KEY (userId)  REFERENCES users (Id)
)`