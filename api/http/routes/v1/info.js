'use strict'

// modules
const router = require('express').Router()
const co = require('co')

function infoRouter() {

  /**
   * @api {GET} / Root endpoint
   * @apiGroup Info
   * @apiDescription Get API info
   * @apiVersion 1.0.0
   */
  router.get('/', function(req, res) {
    return res.ok({
      version: 'v1',
      uptime: process.uptime()
    })
  })

  return router
}

module.exports = infoRouter