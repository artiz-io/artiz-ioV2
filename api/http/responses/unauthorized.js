'use strict'

const statusCode = 401
const statusName = 'Unauthorized'

/**
 * Respond with 401: Unauthorized
 * @param message
 * @param info
 */
function unauthorized(message, info) {
  this.res.status(statusCode)
  return this.res.json({
    statusCode,
    statusName,
    message,
    info
  })
}

module.exports = unauthorized