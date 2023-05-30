const knex = require("../db/connection")

function read(review_id) {
    return knex("reviews")
    .select("reviews.*")
    .where({ review_id })
    .first();
}

function getCritic(review_id) {
    return knex("reviews")
    .join("critics as critic", "reviews.critic_id", "critic.critic_id")
    .select("critic.*")
    .where({ review_id }) 
    .first();
}

function list() {
    return knex("reviews")
    .select("*");
}

function update(updatedReview) {
    return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview);
}

function destroy(review_id) {
    return knex("reviews")
    .where({ review_id })
    .del();
}

module.exports = {
    list,
    update,
    read,
    getCritic,
    delete: destroy,
}