'use strict'

// modules
const router = require('express').Router()
const co = require('co')
const validate = require('express-validation')
const Joi = require('joi')
const basicAuth = require('express-basic-auth')

const auth = basicAuth({
  users: {
    [config.auth.username]: config.auth.password
  },
  challenge: true,
  realm: 'Artiz Subscription List'
})

// models
const Subscriptions = rootRequire('/api/db/models/subscriptions.js')

function subscriptionRouter() {

  /**
   * @api {POST} /subscriptions Subscribe to mailing
   * @apiGroup Subscribe
   * @apiDescription This endpoints automatically subscribes you to the Artiz mailing
   * @apiVersion 1.0.0
   */
  router.post('/add', validate({
    body: {
      email: Joi.string().email().required(),
    }
  }), function(req, res) {
    co(function*() {

      // check
      const subscriptionExists = yield Subscriptions.count({
        email: req.body.email
      })

      if (subscriptionExists < 1) {

        // create the user
        const subscriptionObj = yield Subscriptions.create({
          email: req.body.email
        })

      }

      return res.ok({
        status: "OK"
      })

    }).then(null, res.serverError)
  })

  /**
   * @api {GET} /subscriptions/listAll Get CSV list for Mailchimp
   * @apiGroup Subscribe
   * @apiDescription 
   * @apiVersion 1.0.0
   */
  router.get('/listAll', auth, function(req, res) {
    co(function*() {

      // create the user
      const subscriptionList = yield Subscriptions.find()

      res.setHeader('Content-disposition', `attachment; filename=Export_${new Date().toISOString()}.txt`);
      res.setHeader('Content-type', 'plain/text');

      let data = "";
      for(var i in subscriptionList){

        data += subscriptionList[i].email + "\n"

      }

      return res.send(data)

    }).then(null, res.serverError)
  })


  return router
}

module.exports = subscriptionRouter