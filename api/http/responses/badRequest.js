'use strict'

const statusCode = 400
const statusName = 'Bad Request'

/**
 * Respond with 400: Bad Request
 * @param message
 * @param info
 */
function badRequest(message, info) {
  this.res.status(statusCode)
  return this.res.json({
    statusCode,
    statusName,
    message,
    info
  })
}

module.exports = badRequest