'use strict'

const co = require('co')

module.exports = exports = function mongoosePagination(schema, options) {

  schema.plugin(require('mongoose-paginate'))
  schema.statics.pagination = function(query, options) {

    const self = this
    return new Promise(function(resolve, reject) {
      co(function*() {

        const result = yield self.paginate(query, options)

        // clean
        result.offset = options.offset
        result.limit = options.limit
        result.data = result.docs
        delete result.docs

        // resolve
        resolve(result)

      }).then(resolve, reject)
    })

  }

}