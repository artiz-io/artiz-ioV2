'use strict'

/**
 * Load response helpers
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports = (req, res, next) => {

  const response = {
    req,
    res
  }

  res.ok = require('./ok').bind(response)
  res.notFound = require('./notFound').bind(response)
  res.unauthorized = require('./unauthorized').bind(response)
  res.serverError = require('./serverError').bind(response)
  res.forbidden = require('./forbidden').bind(response)
  res.badRequest = require('./badRequest').bind(response)
  res.conflict = require('./conflict').bind(response)

  return next()
  
}