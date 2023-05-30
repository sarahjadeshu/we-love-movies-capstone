const service = require("./reviews.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function read(req, res) {
    res.json({ data: res.locals.review })
}

async function list(req, res) {
    res.json({ data: await service.list() })
}

async function update(req, res) {
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
    };
    const critic = await service.getCritic(updatedReview.review_id)

    await service.update(updatedReview)
    updatedReview["critic"] = critic;

    res.json({ data: updatedReview })
}

async function reviewExists(req, res, next) {
    const review = await service.read(req.params.reviewId)

    if(review) {
        res.locals.review = review;
        next();
    } else {
        next({ status: 404, message: "Review cannot be found." })
    }
}

async function destroy(req, res) {
    const { review } = res.locals;
    await service.delete(review.review_id)
    res.sendStatus(204);
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(reviewExists), read],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
}