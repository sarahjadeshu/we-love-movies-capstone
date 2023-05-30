const knex = require("../db/connection")

function list() {
    return knex("movies")
    .select("*")
}

function read(movie_id) {
    return knex("movies")
    .select("movies.*")
    .where({ movie_id })
    .first()
}

function listReviews(movie_id) {
    return knex("reviews")
    .join("movies", "reviews.movie_id", "movies.movie_id")
    .select("reviews.*")
    .where({ "reviews.movie_id": movie_id })
}

function getCritic() {
    return knex("critics as critic")
    .join("reviews", "critic.critic_id", "reviews.critic_id")
    .join("movies", "movies.movie_id", "reviews.movie_id")
    .select("critic.*");
}

function getTheater(movie_id) {
    return knex("theaters")
    .join("movies_theaters", "theaters.theater_id", "movies_theaters.theater_id")
    .join("movies", "movies_theaters.movie_id", "movies.movie_id")
    .select("theaters.*", "movies_theaters.*")
    .where({"movies_theaters.movie_id": movie_id});
}

function isShowing() {
    return knex("movies")
    .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
    .distinct("movies.*")
    .where({"movies_theaters.is_showing": true});
}

module.exports = {
    list,
    read,
    isShowing,
    listReviews,
    getCritic,
    getTheater
}