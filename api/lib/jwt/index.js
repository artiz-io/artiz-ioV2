'use strict'

const JWT = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET || 'secret'
const EXPIRY = 60 * 60 * 24 * 31 // 1 month

if (!SECRET) {
  console.error('environment variable JWT_SECRET not set, exiting now!')
  return process.exit(1)
}

/**
 * Sign a new JWT token
 * @param user
 * @param type
 */
function sign(user, type) {
  return JWT.sign({
    [MONGO_ID_FIELD]: user[MONGO_ID_FIELD],
    type: type || undefined
  }, SECRET, {
    noTimestamp: true,
    expiresIn: EXPIRY,
    subject: 'login'
  })
}

/**
 * Verify a JWT token
 * @param token
 * @returns {*}
 */
function verify(token) {
  try {
    return JWT.verify(token, SECRET)
  } catch (e) {
    console.warn('Could not verify JWT', e, token)
    return false
  }
}

module.exports = {
  sign,
  verify
}