if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

const notFound = require("./errors/notFound")
const errorHandler = require("./errors/errorHandler")
const movieRouter = require("./movies/movies.router")
const theaterRouter = require("./theaters/theaters.router")
const reviewRouter = require("./reviews/reviews.router")

app.use(express.json());

app.use("/movies", movieRouter);
app.use("/theaters", theaterRouter);
app.use("/reviews", reviewRouter);

app.use(notFound);
app.use(errorHandler);


module.exports = app;
