'use strict'

const statusCode = 200

/**
 * Respond with 200: OK
 * @param data
 */
function ok(data) {
  this.res.status(statusCode)
  return this.res.json(data)
}

module.exports = ok