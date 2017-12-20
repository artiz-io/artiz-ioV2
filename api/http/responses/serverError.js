'use strict'

const statusCode = 500
const statusName = 'Internal Server Error'

/**
 * Respond with 500: Internal Server Error
 * @param error
 */
function serverError(error) {
  this.res.status(statusCode)

  // log
  console.error(error)

  // overwrite
  if (process.env.NODE_ENV === 'production') {

    error = {
      message: 'An internal error occurred, please contact sys admin'
    }

  }

  // return
  return this.res.json({
    statusCode,
    statusName,
    error
  })
  
}

module.exports = serverError