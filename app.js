const express = require("express");
const morgan = require("morgan");

const usersRouter = require("./routes/usersRouter");
const postsRouter = require("./routes/postsRouter");
const reviewsRouter = require("./routes/reviewsRouter");

const globalErrorHandler = require("./utils/errorController");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/v1/user", usersRouter);
app.use("/api/v1/post", postsRouter);
app.use("/api/v1/review", reviewsRouter);

app.use(globalErrorHandler);

module.exports = app;