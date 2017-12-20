'use strict'

// packages
const url = require('url')

// modules
const path = require('path')
const Express = require('express')

// middlewares
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const useragent = require('express-useragent')

// responses
const responseHelpers = rootRequire('/api/http/responses')

class HttpServer {

  constructor() {

    this.app = new Express()

    // view engine
    this.app.set('view engine', 'ejs')

    // remove useless headers
    this.app.set('etag', false)
    this.app.set('x-powered-by', false)

    // user agent middleware
    this.app.use(useragent.express());

    // cors middleware
    this.app.use(cors())
    this.app.options('*', cors())

    // compression
    this.app.use(compression())

    // request logging
    this.app.use(morgan(':remote-addr - :method :url [:response-time ms]'))

    // body parser
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({
      extended: false
    }))

    // responses
    this.app.use(responseHelpers)

  }

  addRoutes(routes) {
    this.app.use('/api', routes)
  }

  addClientRoutes(routes) {

    // static
    this.app.use('/', Express.static('client/dist'))

  }

  getServer() {
    return this.app
  }

}

module.exports = HttpServer