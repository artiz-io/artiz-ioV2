'use strict'

const co = require('co')

module.exports = exports = function mongoosePatch(schema, options) {

  schema.methods.patch = function(fields, data) {

    const self = this
    return new Promise(function(resolve, reject) {
      co(function*() {

        // go through allowed fields
        for (let i in fields) {

          // check if we need to update
          if (typeof data[fields[i]] !== 'undefined') {

            // update
            self[fields[i]] = data[fields[i]]

          }

        }

        // resolve
        resolve(self.save())

      }).then(resolve, reject)
    })

  }

}