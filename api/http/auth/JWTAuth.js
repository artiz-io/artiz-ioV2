'use strict'

const JWT = rootRequire('/api/lib/jwt')
const User = rootRequire('/api/db/models/user')

function JWTAuth(req, res, next) {

  // get the header
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    return res.unauthorized('No Bearer token found')
  }

  // split header
  const authHeaderParts = authHeader.split(' ')
  if (authHeaderParts.length !== 2) {
    return res.unauthorized('No Bearer token found')
  }

  // find schema and Bearer
  const schema = authHeaderParts[0]
  const bearer = authHeaderParts[1]
  if (schema !== 'Bearer') {
    return res.unauthorized('No Bearer token found')
  }

  // verify Bearer token with JWT
  const token = JWT.verify(bearer)
  if (!token) {
    return res.unauthorized('Could not validate Bearer')
  }

  // find user in database and add it to request state
  User.findOne({
      [MONGO_ID_FIELD]: token[MONGO_ID_FIELD]
    })
    .then(function(user) {

      if (!user) {
        return res.unauthorized('Could not find user')
      }

      // set request state
      req.authenticated = true
      req.jwtAuth = true
      req.user = user
      req.bearer = bearer

      return next()

    }).catch(res.serverError)
}

module.exports = JWTAuth