'use strict'

// log env
console.log('env:', process.env)

// config
global.config = require('configuratoror')({
  folder: 'config'
})(process.env.ENV || 'default');

// log config
console.log('config:', config)

// root require
global.MONGO_ID_FIELD = '_id'
global.rootRequire = function(module) {

  if (module.substr(0, 1) !== '/') {

    console.warn('Warning: rootRequire expects the module path to start with a slash (/)')

  }

  return require(__dirname + '/..' + module)

}

// error handling
process.on('unhandledRejection', (error, p) => {

  console.log('Unhandled Rejection at: Promise', p, 'error:', error.stack || JSON.stringify(error));

});

// create DB connection
const db = rootRequire('/api/db')({
  connection: config.datasources.mongo.url
})

// initiate redis cache
global.redisCache = require('express-redis-cache')({
  client: require('redis').createClient({
    url: config.datasources.redis.url,
  }),
  prefix: config.datasources.redis.prefix
})

// create Express app
const API = rootRequire('/api/http/routes/server.js')
const app = new API()

// create HTTP servers
const server = require('http').createServer(app.getServer())
server.listen(config.server.port, () => {
  console.info(`HTTP server now listening on port ${config.server.port}...`)
})

// external routes
const apiRoutes = rootRequire('/api/http/routes/router.js')()
app.addRoutes(apiRoutes)

// static
app.addClientRoutes()

// export server for testing injection
module.exports = {
  app,
  db,
  server
}