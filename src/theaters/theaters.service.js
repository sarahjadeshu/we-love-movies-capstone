const knex = require("../db/connection")

function list() {
    return knex("theaters")
    .join("movies_theaters", "theaters.theater_id", "movies_theaters.theater_id")
    .join("movies", "movies_theaters.movie_id", "movies.movie_id")
    .select("theaters.*", "movies.title", "movies.rating", "movies.runtime_in_minutes");
}

module.exports = {
    list
}