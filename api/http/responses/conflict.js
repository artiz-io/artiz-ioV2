'use strict'

const statusCode = 409
const statusName = 'Conflict'

/**
 * Respond with 403: Forbidden
 * @param message
 * @param info
 */
function conflict(message, info) {
  this.res.status(statusCode)
  return this.res.json({
    statusCode,
    statusName,
    message,
    info
  })
}

module.exports = conflict