const errorHandler = (error, request, response, next) => {
  switch (error.name) {
  case 'ValidationError':
    response.status(400).send(error.toString())
    break
  default:
    next(error)
  }
}

module.exports = errorHandler
