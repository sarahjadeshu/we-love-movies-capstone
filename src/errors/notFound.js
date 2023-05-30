function notFound(request, res, next) {
    next({status: 404, message: `Path not found: ${request.originalUrl}`})
}

module.exports = notFound;