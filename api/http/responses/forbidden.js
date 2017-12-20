'use strict'

const statusCode = 403
const statusName = 'Forbidden'

/**
 * Respond with 403: Forbidden
 * @param message
 * @param info
 */
function forbidden(message, info) {
  this.res.status(statusCode)
  return this.res.json({
    statusCode,
    statusName,
    message,
    info
  })
}

module.exports = forbidden