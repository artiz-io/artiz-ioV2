'use strict'

// modules
const Bitly = require('bitly')
const redis = require('redis')
const co = require('co')
const redisClient = redis.createClient({
  url: config.datasources.redis.url,
  prefix: 'BitlyCacheLayer'
})

// 
function BitlyCacheLayer() {

	// selffix
	const self = this

  // client
  self.client = new Bitly(config.bitly.token)

  // proxy functions
  self.cached = {

    clicks: function(id) {
      return new Promise(function(resolve, reject) {

        // set key
        const key = `clicks:${id}`;

        // check for cache
        redisClient.get(key, function(err, reply) {
          co(function*() {

          	// no result or an error?
            if (err || !reply) {

            	// get normal result
            	const r = yield self.client.clicks(id)

              // cache it then
              redisClient.set(key, JSON.stringify(r), 'EX', 60 * 60)

              // return normal result
              return resolve(r)

            }

            // resolve
            return resolve(JSON.parse(reply))

          }).then(null, reject)
        })

      })
    },
    clicksByDay: function(id) {
      return new Promise(function(resolve, reject) {

        // set key
        const key = `clicksByDay:${id}`;

        // check for cache
        redisClient.get(key, function(err, reply) {
          co(function*() {

          	// no result or an error?
            if (err || !reply) {

            	// get normal result
            	const r = yield self.client.clicksByDay(id)

              // cache it then
              redisClient.set(key, JSON.stringify(r), 'EX', 60 * 60)

              // return normal result
              return resolve(r)

            }

            // resolve
            return resolve(JSON.parse(reply))

          }).then(null, reject)
        })

      })
    }

  }

}

module.exports = new BitlyCacheLayer()