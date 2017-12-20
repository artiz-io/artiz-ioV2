'use strict'

const ev = require('express-validation')
const express = require('express')
const router = express.Router()
const path = require('path')

function addEndpointHeader(version) {

  return function(req, res, next) {

    // version header
    res.header('X-Endpoint-Version', version)

    // done
    next()

  }

}

function addBindings(version, routePrefix, bindings) {

  // add
  router.use(routePrefix, addEndpointHeader(version))

  // loop routes enabled for this version
  for (let bindingPath in bindings) {

    // save binding path
    let bindingUrl = bindings[bindingPath].bind

    // check if this version is enabled
    if (bindings[bindingPath].versions.indexOf(version) === -1) {

      // skip
      continue

    }

    // set the url (sanitised)
    let url = (routePrefix + bindingUrl).replace('//', '/')

    console.log('BIND', url, './' + version + '/' + bindingPath)

    // finally bind
    router.use(url, require('./' + version + '/' + bindingPath)())

  }

}

function loadRoutes() {

  // get routes configuration
  const routes = config.routes

  // loop enabled versions
  for (let i = 0; i < routes.versions.enabled.length; i++) {

    // check default
    if (routes.versions.default === routes.versions.enabled[i]) {

      // define endpoint
      addBindings(routes.versions.enabled[i], `/`, routes.bindings)

    }

    // define endpoint
    addBindings(routes.versions.enabled[i], `/${routes.versions.enabled[i]}`, routes.bindings)

  }

  // validation error middleware
  // location is off but nothing else worked?
  router.use(function(err, req, res, next) {

    // specific for validation errors
    if (err instanceof ev.ValidationError) {

      return res.badRequest('Validation errors', err.errors)

    }

    next()

  })

  return router

}

module.exports = loadRoutes