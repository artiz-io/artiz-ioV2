'use strict'

const statusCode = 404
const statusName = 'Not Found'

/**
 * Respond with 404: Not Found
 * @param message
 * @param info
 */
function notFound(message, info) {
  this.res.status(statusCode)
  return this.res.json({
    statusCode,
    statusName,
    message,
    info
  })
}

module.exports = notFound