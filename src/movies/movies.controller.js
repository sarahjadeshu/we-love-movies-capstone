const service = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res) {
    if (req.query.is_showing === 'true') {
        res.json({ data: await service.isShowing() })
    } else {
        res.json({ data: await service.list() });
    }
}

async function read(req, res) {
    res.json({ data: res.locals.movie })
}

async function movieExists(req, res, next) {
    const movie = await service.read(req.params.movieId)

    if (movie) {
        res.locals.movie = movie;
        console.log(movie)
        return next();
    } else {
        next({ status: 404, message: "Movie cannot be found." });
    }
}

async function listReviews(req, res) {
    const reviews = await service.listReviews(req.params.movieId)
    const critics = await service.getCritic()

    reviews.forEach((review) => {
        critics.filter((critic) => {
            if(critic.critic_id === review.critic_id) {
                review["critic"] = critic;
            };
        });
    })
    res.json({ data: reviews })
}

async function listTheaters(req, res) {
    const theaters = await service.getTheater(req.params.movieId)

    res.json({ data: theaters })
}

module.exports = {
    list: asyncErrorBoundary(list),
    listReviews: asyncErrorBoundary(listReviews),
    read: [asyncErrorBoundary(movieExists), read],
    listTheaters: asyncErrorBoundary(listTheaters),
}